import React, { useEffect, useState } from 'react'
import { Layout, ColumnForm, ColumnPreview, Header } from '../style'
import UploadButton from '@root/components/suport/UploadButton'
import { api } from '@root/api'
import { FileType } from '@root/types'
import { Divider, Header as SHeader, Progress } from 'semantic-ui-react'
import FilesList from './FilesList'
import LoadingArea from '@root/components/suport/LoadingArea'
import { useSetRecoilState } from 'recoil'
import { basicModalState } from '@root/components/modals/BasicModal'
import { toast } from 'react-semantic-toasts'
import { ProgressBox, UploadButtonArea } from './style'

interface iFiles {
  files: FileType[]
  storyId: string
  refresh: () => void
  isLoading: boolean
}

const Files: React.FC<iFiles> = ({ storyId, refresh, files, isLoading, children }) => {
  const setBasicModalState = useSetRecoilState(basicModalState)
  const [progressFiles, setProgressFiles] = useState<Record<string, number>>({})
  const [progress, setProgress] = useState<number>(0)
  const [totalFiles, setTotalFiles] = useState<number>(0)

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

  useEffect(() => {
    console.log(progressFiles)
  }, [progressFiles])

  useEffect(() => {
    const max = totalFiles * 100
    const allValues = Object.values(progressFiles)
    const current = allValues.reduce((a, b) => a + b, 0)
    setProgress((current / max) * 100)
  }, [progressFiles, totalFiles])

  const upload = async (file: File) => {
    try {
      await api.uploadFile(storyId, file, ({ loaded, total }) => {
        const progress = Math.round((loaded * 100) / total)
        setProgressFiles(prevValue => {
          prevValue[file.name] = progress < 0 ? 0 : progress
          return { ...prevValue }
        })
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

  const handleSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return
    const files = Array.from(event.target.files)
    setTotalFiles(files.length)
    await Promise.all(files.map(file => upload(file)))
    setProgressFiles({})
    setTotalFiles(0)
    setProgress(0)
    refresh()
  }

  return (
    <Layout>
      <LoadingArea isLoading={isLoading}>
        <ColumnForm>
          <Header>Link files to your video for viewers to download</Header>
          <UploadButtonArea>
            <UploadButton onSelected={handleSelected} primary multiple={true}>
              Upload new file
            </UploadButton>
            <ProgressBox>{!!progress && <Progress percent={progress} progress={true} />}</ProgressBox>
          </UploadButtonArea>
          <Divider />
          <SHeader as="h1">List of files</SHeader>
          <FilesList files={files} onRemove={onRemove} />
        </ColumnForm>
        <ColumnPreview>{children}</ColumnPreview>
      </LoadingArea>
    </Layout>
  )
}

export default Files
