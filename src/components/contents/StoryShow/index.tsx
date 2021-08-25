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
import Links from './TabsContent/Links'
import Files from './TabsContent/Files'
import Gallery from './TabsContent/Gallery'
import People from './TabsContent/People'
import Timeline from './TabsContent/Timeline'
import Transcript from './TabsContent/Transcript'
import Places from './TabsContent/Places'
import RelatedVideos from './RelatedVideos'
import { UserType } from '@root/types'

const StoryShow: React.FC = () => {
  const { search, pathname } = useLocation()
  const history = useHistory()
  const parsedQs = parse(search, { ignoreQueryPrefix: true })
  const { tab } = parsedQs

  const { storyId } = useParams<{ storyId: string; tab: string }>()
  const { story, isLoading } = useApiStory(storyId)

  const {
    type,
    video,
    audio,
    thumbnail,
    owner,
    title,
    description,
    collections,
    comments,
    persons,
    files,
    links,
    transcription,
    galleryEntries,
    timelineEntries,
    places,
    watchers,
    subtitles
  } = story

  const showMenu = {
    transcript: !!transcription,
    people: !!persons?.length,
    places: !!places?.length,
    timeline: !!timelineEntries?.length,
    gallery: !!galleryEntries?.length,
    files: !!files?.length,
    links: !!links?.length
  }

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
    if (isLoading) return
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!showMenu[tab]) handleTabChange('information', true)
  }, [tab, isLoading])

  const stiwchRender = () => {
    switch (tab) {
      case 'places':
        return <Places places={places || []} />
      case 'people':
        return <People persons={persons || []} />
      case 'transcript':
        return <Transcript transcription={transcription} />
      case 'timeline':
        return <Timeline ocurrencies={timelineEntries || []} />
      case 'gallery':
        return <Gallery galleries={galleryEntries || []} />
      case 'files':
        return <Files files={files || []} />
      case 'links':
        return <Links links={links || []} />
      default:
        return (
          <Info
            storyId={storyId}
            subTitle={(collections && collections[0]?.title) || ''}
            title={title as string}
            description={description as string}
            owner={owner as UserType}
            comments={comments || []}
            watchers={watchers || []}
          />
        )
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
        <Menu tab={tab as string} onChange={handleTabChange} showMenu={showMenu} />
        <ContentBox>
          <Content>{stiwchRender()}</Content>
          {!!collections?.length && !!collections[0].stories.length && (
            <VideosArea>
              <RelatedVideos stories={collections[0]?.stories} />
            </VideosArea>
          )}
        </ContentBox>
      </ContentArea>
    </LoadingArea>
  )
}

export default StoryShow
