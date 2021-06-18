import React, { useState } from 'react'
import RichTextEditor, { EditorValue } from 'react-rte'
import { Layout, ColumnForm, ColumnPreview } from '../style'
import { Rte } from './style'

const Transcript: React.FC = ({ children }) => {
  const [value, setValue] = useState<EditorValue>(RichTextEditor.createEmptyValue())

  const onChange = (value: EditorValue) => {
    setValue(value)
  }

  return (
    <Layout>
      <ColumnForm>
        <div>Link files to your video for viewers to download or write in the field below</div>
        <label>Transcript</label>
        <Rte value={value} onChange={onChange} />
      </ColumnForm>
      <ColumnPreview>{children}</ColumnPreview>
    </Layout>
  )
}

export default Transcript
