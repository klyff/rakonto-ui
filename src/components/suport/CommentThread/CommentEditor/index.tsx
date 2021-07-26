import React, { ReactNode, useCallback, useRef, useState } from 'react'
import { convertToRaw, EditorState } from 'draft-js'
import Editor from '@draft-js-plugins/editor'
import { EditorBox } from './style'
import EditorWithMentions from '../EditorWithMentions'
import { Button } from 'semantic-ui-react'
import { toast } from 'react-semantic-toasts'
import { CommentFormType } from '@root/types'
import { MentionData } from '@draft-js-plugins/mention'

interface iCommentEditor {
  createAction: (comment: CommentFormType) => void
  mentions?: MentionData[]
  id: string
}

const CommentEditor: React.FC<iCommentEditor> = ({ id, mentions, createAction }) => {
  const ref = useRef<Editor>(null)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const handleSave = async () => {
    try {
      await createAction({
        body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        storyId: id
      })
      setEditorState(EditorState.createEmpty())
    } catch (error) {
      toast({
        type: 'error',
        title: error.response.data.message,
        time: 3000,
        description: `Error: ${error.response.data.code}`
      })
    }
  }

  const onChange = useCallback((_editorState: EditorState) => {
    setEditorState(_editorState)
  }, [])

  return (
    <>
      <EditorBox
        onClick={() => {
          ref.current?.focus()
        }}
      >
        <EditorWithMentions mentions={mentions} onChange={onChange} state={editorState} ref={ref} />
      </EditorBox>
      <Button content="Send comment" labelPosition="left" icon="edit" primary onClick={handleSave} />
    </>
  )
}

export default CommentEditor
