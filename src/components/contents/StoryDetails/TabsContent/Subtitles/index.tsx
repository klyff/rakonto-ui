import React from 'react'
import { Layout, ColumnForm, ColumnPreview } from '../style'
import { Header } from './style'
import UploadButton from '@root/components/suport/UploadButton'
import { api } from '@root/api'
import { FileType, LanguageEnum } from '@root/types'
import { Divider, Header as SHeader } from 'semantic-ui-react'
import FileList from './FilesList'
import LoadingArea from '@root/components/suport/LoadingArea'
import { useSetRecoilState } from 'recoil'
import { basicModalState } from '@root/components/modals/BasicModal'
import { toast } from 'react-semantic-toasts'

interface iSubtitles {
  files: FileType[]
  storyId: string
  refresh: () => void
  isLoading: boolean
}

const Subtitles: React.FC<iSubtitles> = ({ storyId, refresh, files, isLoading, children }) => {
  const setBasicModalState = useSetRecoilState(basicModalState)

  const handleUploadProgress = (value: number) => {
    console.log(value)
  }

  const onRemove = async (value: FileType) => {
    setBasicModalState({
      open: true,
      title: 'Remove file',
      isConfirmation: true,
      onClose: async (isSuccess: boolean) => {
        if (!isSuccess) return
        await api.deleteFile(value.id)
        refresh()
      },
      content: (
        <>
          Do you want remove file <b>{value.originalName}</b> from this story?
        </>
      )
    })
  }

  const handleSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return
    const file: File = event.target.files[0]
    try {
      await api.uploadSubtitle(storyId, LanguageEnum.portuguese, file, ({ loaded, total }) => {
        const progress = Math.round((loaded * 100) / total) - 1
        console.log(progress < 0 ? 0 : progress)
      })
      refresh()
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
      <LoadingArea isLoading={isLoading}>
        <ColumnForm>
          <Header>Link files to your video for viewers to download</Header>
          <UploadButton onSelected={handleSelected} onProgressChange={handleUploadProgress} basic primary>
            Upload new subtitle
          </UploadButton>
          <Divider />
          <SHeader as="h1">List of subtitles</SHeader>
          <FileList files={files} onRemove={onRemove} />s
        </ColumnForm>
        <ColumnPreview>{children}</ColumnPreview>
      </LoadingArea>
    </Layout>
  )
}

export default Subtitles
