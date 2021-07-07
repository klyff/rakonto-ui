import React, { useEffect, useState } from 'react'
import { Header, Icon } from 'semantic-ui-react'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import { useApiStory } from './useApiStory'
import { ContentArea } from '../style'
import Menu from './Menu'
import { parse, stringify } from 'qs'
import { Location } from 'history'
import { useRecoilValue } from 'recoil'
import { mediaStatusState } from '@root/states/mediaStatusState'
import Info from './TabsContent/Info'
import Transcript from './TabsContent/Transcript'
import Timeline from './TabsContent/Timeline'
import Files from './TabsContent/Files'
import Links from './TabsContent/Links'
import Gallery from './TabsContent/Gallery'
import People from './TabsContent/People'
import Places from './TabsContent/Places'
import Preview from './PreviewBox'

const StoryDetails: React.FC = () => {
  const { search, pathname } = useLocation()
  const [storyProgress, seStoryProgress] = useState<number>(0)
  const mediaStatus = useRecoilValue(mediaStatusState)
  const history = useHistory()
  const parsedQs = parse(search, { ignoreQueryPrefix: true })
  const { tab } = parsedQs

  const { storyId } = useParams<{ storyId: string; tab: string }>()
  const { story, isLoading, setStory, updateStory, refresh } = useApiStory(storyId)

  const {
    type,
    ready,
    video,
    audio,
    thumbnail,
    persons,
    files,
    links,
    transcription,
    galleryEntries,
    timelineEntries
  } = story

  useEffect(() => {
    const id = audio?.id || video?.id || ''
    if (!mediaStatus[id]) return
    const { payload, finished, progress } = mediaStatus[id]
    if (finished) {
      setStory(value => {
        return {
          ...value,
          ready: true,
          thumbnail: payload.thumbnail,
          video: {
            ...value.video,
            ...payload
          }
        }
      })
    }
    seStoryProgress(progress)
  }, [mediaStatus])

  const handleTabChange = (name: string, isToReplace?: boolean) => {
    const search = stringify(
      {
        ...parsedQs,
        tab: name
      },
      { addQueryPrefix: true }
    )
    if (isToReplace) {
      history.replace({
        pathname,
        search
      } as unknown as Location)
      return
    }
    history.push({
      pathname,
      search
    } as unknown as Location)
  }

  useEffect(() => {
    if (!tab) handleTabChange('information', true)
  }, [tab])

  const PreviewComponent = (
    <Preview type={type} media={video || audio} progress={storyProgress} thumbnail={thumbnail} ready={ready} />
  )

  const stiwchRender = () => {
    switch (tab) {
      case 'places':
        return <Places />
      case 'people':
        return (
          <People storyId={storyId} persons={persons} refresh={refresh} isLoading={isLoading}>
            {PreviewComponent}
          </People>
        )
      case 'transcript':
        return (
          <Transcript storyId={storyId} transcription={transcription}>
            {PreviewComponent}
          </Transcript>
        )
      case 'timeline':
        return (
          <Timeline isLoading={isLoading} refresh={refresh} storyId={storyId} ocurrencies={timelineEntries || []}>
            {PreviewComponent}
          </Timeline>
        )
      case 'gallery':
        return (
          <Gallery isLoading={isLoading} refresh={refresh} storyId={storyId} galleries={galleryEntries || []}>
            {PreviewComponent}
          </Gallery>
        )
      case 'files':
        return (
          <Files storyId={storyId} refresh={refresh} files={files || []} isLoading={isLoading}>
            {PreviewComponent}
          </Files>
        )
      case 'links':
        return (
          <Links storyId={storyId} refresh={refresh} links={links || []} isLoading={isLoading}>
            {PreviewComponent}
          </Links>
        )
      default:
        return (
          <Info story={story} updateStory={updateStory} isLoading={isLoading}>
            {PreviewComponent}
          </Info>
        )
    }
  }

  return (
    <ContentArea>
      <Link to={'/a/stories'}>
        <Icon name="arrow left" />
        Back
      </Link>
      <Header as="h1">Story</Header>
      <Menu tab={tab as string} onChange={handleTabChange} />
      {stiwchRender()}
    </ContentArea>
  )
}

export default StoryDetails
