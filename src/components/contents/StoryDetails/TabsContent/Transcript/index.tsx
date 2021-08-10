import React, { useState, useEffect } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Layout, ColumnForm, ColumnPreview, Header } from '../style'
import { SaveButton, EditorWrapper } from './style'
import { api } from '@root/api'
import { TranscriptionType } from '@root/types'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { toast } from 'react-semantic-toasts'

interface iTranscript {
  storyId: string
  refresh: () => void
  transcription?: TranscriptionType | null
}

const Transcript: React.FC<iTranscript> = ({ children, refresh, transcription, storyId }) => {
  const [value, setValue] = useState<EditorState>(EditorState.createEmpty())

  useEffect(() => {
    if (transcription) {
      const contentBlock = htmlToDraft(transcription.content)
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
        const editorState = EditorState.createWithContent(contentState)
        setValue(editorState)
      }
    }
  }, [transcription])

  const onChange = (value: EditorState) => {
    setValue(value)
  }

  const handleSave = async () => {
    try {
      const content = draftToHtml(convertToRaw(value.getCurrentContent()))
      if (!transcription) {
        await api.createTranscriptions({
          content,
          storyId: storyId
        })
        refresh()
        toast({
          type: 'success',
          title: 'Saved',
          time: 3000
        })
        return
      }

      await api.updateTranscriptions(transcription.id, {
        content,
        storyId: storyId
      })
      refresh()
      toast({
        type: 'success',
        title: 'Saved',
        time: 3000
      })
    } catch (error) {
      toast({
        type: 'error',
        title: error.response.data.message,
        time: 3000,
        description: `Error: ${error.response.data.code}`
      })
    }
  }

  return (
    <Layout>
      <ColumnForm>
        <Header>
          A transcript can help people find specific information in your story. Copy and paste, or type your transcript
          text here. Remember to save your work!
        </Header>
        <div>
          <SaveButton primary id="save" onClick={handleSave}>
            Save
          </SaveButton>
        </div>
        <label>Transcription</label>
        <EditorWrapper>
          <Editor
            editorState={value}
            onEditorStateChange={onChange}
            wrapperClassName="transcript-wrapper"
            editorClassName="transcript-editor"
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true }
            }}
          />
        </EditorWrapper>
      </ColumnForm>
      <ColumnPreview>{children}</ColumnPreview>
    </Layout>
  )
}

export default Transcript
