import React, { useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useApiStory } from './useApiStory'
import Menu from './Menu'
import { parse, stringify } from 'qs'
import { Location } from 'history'
import Player from '@root/components/suport/Player'
import { PreviewBox, ContentArea, ContentBox, VideosArea, Content } from './style'
import LoadingArea from '@root/components/suport/LoadingArea'
import Info from './TabsContent/Info'
import SuggestedVideos from './SuggestedVideos'

const StoryShow: React.FC = () => {
  const { search, pathname } = useLocation()
  const history = useHistory()
  const parsedQs = parse(search, { ignoreQueryPrefix: true })
  const { tab } = parsedQs

  const { storyId } = useParams<{ storyId: string; tab: string }>()
  const { story, isLoading } = useApiStory(storyId)

  const {
    type,
    ready,
    published,
    video,
    audio,
    thumbnail,
    persons,
    files,
    links,
    transcription,
    galleryEntries,
    timelineEntries,
    places,
    watchers,
    subtitles,
    title,
    description
  } = story

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

  const stiwchRender = () => {
    switch (tab) {
      case 'places':
        return <div></div>
      case 'people':
        return <div></div>
      case 'transcript':
        return <div></div>
      case 'timeline':
        return <div></div>
      case 'subtitles':
        return <div></div>
      case 'gallery':
        return <div></div>
      case 'files':
        return <div></div>
      case 'links':
        return <div></div>
      default:
        return <Info story={story} />
    }
  }

  return (
    <LoadingArea isLoading={isLoading}>
      <ContentArea>
        <PreviewBox>
          <div>
            <Player subtitles={subtitles || []} type={type} media={video || audio} cover={thumbnail} />
          </div>
        </PreviewBox>
        <Menu tab={tab as string} onChange={handleTabChange} />
        <ContentBox>
          <Content>{stiwchRender()}</Content>
          <VideosArea>
            <SuggestedVideos />
          </VideosArea>
        </ContentBox>
      </ContentArea>
    </LoadingArea>
  )
}

export default StoryShow
