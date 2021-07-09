import React, { useState, useEffect } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Layout, ColumnForm, ColumnPreview } from '../style'
import { SaveButton, EditorWrapper } from './style'
import { api } from '@root/api'
import { TranscriptionType } from '@root/types'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

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
    const content = draftToHtml(convertToRaw(value.getCurrentContent()))
    if (!transcription) {
      await api.createTranscriptions({
        content,
        storyId: storyId
      })
      refresh()
      return
    }

    await api.updateTranscriptions(transcription.id, {
      content,
      storyId: storyId
    })
    refresh()
  }

  return (
    <Layout>
      <ColumnForm>
        <div>Link files to your video for viewers to download or write in the field below</div>
        <div>
          <SaveButton primary id="save" basic onClick={handleSave}>
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
