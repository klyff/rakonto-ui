import React, { useState, useCallback, useContext } from 'react'
import { CommentType, CommentFormType } from '../../lib/types'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import initials from 'initials'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import { MentionData } from '@draft-js-plugins/mention'
import useUser from '../UserProvider/useUser'
import { SimpleSnackbarContext } from '../SimpleSnackbar'
import EditorWithMentions from './EditorWithMentions'
import { AxiosError } from 'axios'
import { formatDistance, parseJSON } from 'date-fns'
import CommentBox from './CommentBox'

interface iComments {
  mentions?: MentionData[]
  comment: CommentType
  id: string
  type: 'collection' | 'story'
  deleteComment: (commentId: string) => void
  editComment: (commentId: string, data: CommentFormType) => Promise<void>
}

const Comment: React.FC<iComments> = ({ comment, type, editComment, deleteComment, mentions, id }) => {
  const { author } = comment
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const { user } = useUser()
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(JSON.parse(comment.body)))
  )
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const onChange = useCallback((_editorState: EditorState) => {
    setEditorState(_editorState)
  }, [])

  const handleDelete = async (commentId: string) => {
    await deleteComment(commentId)
  }

  const handleEdit = async () => {
    setIsEditing(true)
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
        commentableId: id,
        commentableType: type,
        parentId: comment.parentId
      })
      setIsEditing(false)
      snackActions.open('Saved')
    } catch (error) {
      const isAxiosError = (candidate: any): candidate is AxiosError => {
        return candidate.isAxiosError === true
      }

      if (isAxiosError(error)) {
        snackActions.open(error?.response?.data.message)
      }
    }
  }

  const isOwner = user?.id === comment.author.id

  const fullname = `${author.firstName.charAt(0).toUpperCase() + author.firstName.slice(1)} ${
    author.lastName.charAt(0).toUpperCase() + author.lastName.slice(1)
  }`

  return (
    <>
      <ListItem key={comment.id} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={fullname} src={author?.picture?.url}>
            {initials(fullname)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Typography variant="subtitle2" component="span">
                {fullname}
              </Typography>{' '}
              <Typography component="div" variant="caption">
                {formatDistance(parseJSON(comment.updatedAt), new Date(), { addSuffix: true })}
              </Typography>
            </>
          }
          secondary={
            isEditing ? (
              <CommentBox>
                <EditorWithMentions mentions={mentions} onChange={onChange} state={editorState} />
              </CommentBox>
            ) : (
              <EditorWithMentions readOnly={true} mentions={mentions} onChange={onChange} state={editorState} />
            )
          }
        />
        <Box
          sx={{
            position: 'absolute',
            right: 0
          }}
        >
          {isOwner && (
            <>
              {isEditing ? (
                <>
                  <Button onClick={handleSave}>Save</Button>
                  <Button onClick={handleCancel}>Cancel</Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      handleEdit()
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(comment.id)
                    }}
                  >
                    Delete
                  </Button>
                </>
              )}
            </>
          )}
        </Box>
      </ListItem>
      <Divider />
    </>
  )
}

export default Comment
