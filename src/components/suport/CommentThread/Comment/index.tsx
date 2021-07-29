import React, { useCallback, useRef, useState } from 'react'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import { formatDistance, parseJSON, subDays } from 'date-fns'
import Editor from '@draft-js-plugins/editor'
import { MentionData } from '@draft-js-plugins/mention'
import { EditorBox, CommentWrapper } from './style'
import { CommentFormType, CommentType } from '@root/types'
import { useRecoilValue } from 'recoil'
import { userState } from '@root/states/userState'
import EditorWithMentions from '../EditorWithMentions'
import ShowMore from '@root/components/suport/ShowMore'
import Avatar from '@root/components/suport/Avatar'
import { toast } from 'react-semantic-toasts'

interface iComment {
  mentions?: MentionData[]
  comment: CommentType
  id: string
  deleteComment: (commentId: string) => void
  editComment: (commentId: string, data: CommentFormType) => Promise<void>
}

const Comment: React.FC<iComment> = ({ comment, editComment, deleteComment, mentions, id }) => {
  const ref = useRef<Editor>(null)
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(JSON.parse(comment.body)))
  )
  const user = useRecoilValue(userState)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const onChange = useCallback((_editorState: EditorState) => {
    setEditorState(_editorState)
  }, [])

  const handleDelete = async (commentId: string) => {
    await deleteComment(commentId)
  }

  const handleEdit = async () => {
    setIsEditing(true)
    ref.current?.focus()
  }

  const handleCancel = async () => {
    setIsEditing(false)
    setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(comment.body))))
  }

  const handleSave = async () => {
    try {
      const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      await editComment(comment.id, {
        body: content,
        storyId: id,
        parentId: comment.parentId
      })
      setIsEditing(false)
      toast({
        type: 'success',
        title: 'Saved',
        time: 3000
      })
    } catch (error) {
      toast({
        type: 'error',
        title: error.response.data.message || error.message,
        time: 3000,
        description: `Error: ${error.response.data.code || error.status}`
      })
    }
  }

  const isOwner = user?.id === comment.author.id

  const name = `${comment.author.firstName.charAt(0).toUpperCase() + comment.author.firstName.slice(1)} ${
    comment.author.lastName.charAt(0).toUpperCase() + comment.author.lastName.slice(1)
  }`

  return (
    <CommentWrapper>
      <CommentWrapper.Avatar as={Avatar} picture={comment.author?.picture?.thumbnail || ''} name={name} />
      <CommentWrapper.Content>
        <CommentWrapper.Author as="a">{name}</CommentWrapper.Author>
        <CommentWrapper.Metadata>
          <span>{formatDistance(parseJSON(comment.updatedAt), new Date(), { addSuffix: true })}</span>
        </CommentWrapper.Metadata>
        <CommentWrapper.Text>
          {isEditing ? (
            <EditorBox
              onClick={() => {
                ref.current?.focus()
              }}
            >
              <EditorWithMentions mentions={mentions} onChange={onChange} state={editorState} ref={ref} />
            </EditorBox>
          ) : (
            <ShowMore lines={3}>
              <EditorWithMentions readOnly={true} mentions={mentions} onChange={onChange} state={editorState} />
            </ShowMore>
          )}
        </CommentWrapper.Text>
        <CommentWrapper.Actions>
          {isOwner && (
            <>
              {isEditing ? (
                <>
                  <CommentWrapper.Action onClick={handleSave}>Save</CommentWrapper.Action>
                  <CommentWrapper.Action onClick={handleCancel}>Cancel</CommentWrapper.Action>
                </>
              ) : (
                <>
                  <CommentWrapper.Action
                    onClick={() => {
                      handleEdit()
                    }}
                  >
                    Edit
                  </CommentWrapper.Action>
                  <CommentWrapper.Action
                    onClick={() => {
                      handleDelete(comment.id)
                    }}
                  >
                    Delete
                  </CommentWrapper.Action>
                </>
              )}
            </>
          )}
        </CommentWrapper.Actions>
      </CommentWrapper.Content>
    </CommentWrapper>
  )
}

export default Comment
