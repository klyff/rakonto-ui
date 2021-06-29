import React from 'react'
import { Layout, ColumnForm, ColumnPreview } from '../style'
import { Header } from './style'
import UploadButton from '@root/components/suport/UploadButton'
import { api } from '@root/api'
import { FileType } from '@root/types'
import { Divider, Header as SHeader } from 'semantic-ui-react'
import FilesList from './FilesList'

interface iFiles {
  files: FileType[]
  storyId: string
  refresh: () => void
  isLoading: boolean
}

const Files: React.FC<iFiles> = ({ storyId, refresh, files, isLoading, children }) => {
  const handleUploadFinished = async (value: FileType) => {
    await api.addFileToStory(storyId, value.id)
    refresh()
  }

  const handleUploadProgress = (value: number) => {
    console.log(value)
  }

  const handleRemoveFile = async (value: FileType) => {
    await api.removeFileFromStory(storyId, value.id)
    await api.deleteFile(value.id)
    refresh()
  }

  return (
    <Layout>
      <ColumnForm>
        <Header>Link files to your video for viewers to download</Header>
        <UploadButton
          api={api.uploadFile}
          onFinished={handleUploadFinished}
          onProgressChange={handleUploadProgress}
          basic
          primary
        >
          Upload new file
        </UploadButton>
        <Divider />
        <SHeader as="h1">List of files</SHeader>
        <FilesList files={files} onRemove={handleRemoveFile} />
      </ColumnForm>
      <ColumnPreview>{children}</ColumnPreview>
    </Layout>
  )
}

export default Files
