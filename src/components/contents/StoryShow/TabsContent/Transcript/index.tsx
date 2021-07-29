import React, { useState } from 'react'
import { EditorState, ContentState } from 'draft-js'
import { EditorWrapper } from './style'
import { TranscriptionType } from '@root/types'
import htmlToDraft from 'html-to-draftjs'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

interface iTranscript {
  transcription?: TranscriptionType | null
}

const Transcript: React.FC<iTranscript> = ({ children, transcription }) => {
  const [value] = useState<EditorState>(() => {
    if (!transcription) return EditorState.createEmpty()
    const contentBlock = htmlToDraft(transcription.content)
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
    return EditorState.createWithContent(contentState)
  })

  return (
    <EditorWrapper>
      <Editor
        editorState={value}
        wrapperClassName="transcript-wrapper"
        editorClassName="transcript-editor"
        readOnly={true}
        toolbarHidden
      />
    </EditorWrapper>
  )
}

export default Transcript
