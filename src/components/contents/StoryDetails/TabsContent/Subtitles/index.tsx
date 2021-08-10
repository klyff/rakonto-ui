import React, { useState } from 'react'
import { Layout, ColumnForm, ColumnPreview, Header } from '../style'
import { Box } from './style'
import UploadButton from '@root/components/suport/UploadButton'
import { api } from '@root/api'
import { LanguageEnum, SubtitleType } from '@root/types'
import { Divider, DropdownProps, Header as SHeader, Select } from 'semantic-ui-react'
import SubtitleList from './SubtitleList'
import LoadingArea from '@root/components/suport/LoadingArea'
import { useSetRecoilState } from 'recoil'
import { basicModalState } from '@root/components/modals/BasicModal'
import { toast } from 'react-semantic-toasts'

interface iSubtitles {
  subtitles: SubtitleType[]
  storyId: string
  refresh: () => void
  isLoading: boolean
}

const countryOptions = Object.values(LanguageEnum).map(item => ({ key: item, value: item, text: item }))

const Subtitles: React.FC<iSubtitles> = ({ storyId, refresh, subtitles, isLoading, children }) => {
  const setBasicModalState = useSetRecoilState(basicModalState)
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageEnum | undefined>()

  const onRemove = async (value: SubtitleType) => {
    setBasicModalState({
      open: true,
      title: 'Remove subtitle',
      isConfirmation: true,
      onClose: async (isSuccess: boolean) => {
        try {
          if (!isSuccess) return
          await api.deleteSubtitle(value.id)
          refresh()
          toast({
            type: 'success',
            title: `Subtitle removed`,
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
      },
      content: (
        <>
          Do you want remove subtitle <b>{value.originalName}</b> from this story?
        </>
      )
    })
  }

  const handleSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return
    const file: File = event.target.files[0]
    try {
      await api.uploadSubtitle(storyId, selectedLanguage as LanguageEnum, file, ({ loaded, total }) => {
        const progress = Math.round((loaded * 100) / total)
        console.log(progress < 0 ? 0 : progress)
      })
      refresh()
      setSelectedLanguage(undefined)
      toast({
        type: 'success',
        title: `Subtitle uploaded`,
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

  const handleSelectChange = (e: React.SyntheticEvent<HTMLElement>, { value }: DropdownProps) => {
    setSelectedLanguage(value as LanguageEnum)
  }

  return (
    <Layout>
      <LoadingArea isLoading={isLoading}>
        <ColumnForm>
          <Header>
            Add subtitles to your video. Select a language and upload a file. Upload files for different languages and
            help users understand content in any supported language.
          </Header>
          <Box>
            <Select
              placeholder="Select your language"
              options={countryOptions}
              fluid
              onChange={handleSelectChange}
              value={selectedLanguage}
            />
            <UploadButton onSelected={handleSelected} disabled={!selectedLanguage} primary fluid accept={'.vtt'}>
              Upload new subtitle
            </UploadButton>
          </Box>
          <Divider />
          <SHeader as="h1">List of subtitles</SHeader>
          <SubtitleList subtitles={subtitles} onRemove={onRemove} />
        </ColumnForm>
        <ColumnPreview>{children}</ColumnPreview>
      </LoadingArea>
    </Layout>
  )
}

export default Subtitles
