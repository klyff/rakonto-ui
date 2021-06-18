import React, { useEffect } from 'react'
import { Header, Icon } from 'semantic-ui-react'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import { useApiStory } from './useApiStory'
import LoadingArea from '@root/components/suport/LoadingArea'
import { ContentArea } from '../style'
import Menu from './Menu'
import { parse, stringify } from 'qs'
import { Location } from 'history'
import Info from './TabsContent/Info'
import Transcript from './TabsContent/Transcript'
import Timeline from './TabsContent/Timeline'
import Files from './TabsContent/Files'
import Links from './TabsContent/Links'
import Gallery from './TabsContent/Gallery'
import People from './TabsContent/People'
import Places from './TabsContent/Places'
import Preview from './PreviewBox'
import { useStoryStatus } from './useStoryStatus'

const StoryDetails: React.FC = () => {
  const { search, pathname } = useLocation()
  const history = useHistory()
  const parsedQs = parse(search, { ignoreQueryPrefix: true })
  const { tab } = parsedQs

  const { storyId } = useParams<{ storyId: string; tab: string }>()
  const { story, isLoading, setStory, updateStory } = useApiStory(storyId)

  const { type, ready, video, audio, thumbnail, persons } = story

  const { storyProgress } = useStoryStatus(payload => {
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
  }, audio?.id || video?.id)

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
          <People
            persons={[
              {
                id: '1',
                description: 'http://192.168.9.1',
                name: 'João da luz',
                picture: {
                  id: '1231',
                  thumbnail: '1231',
                  processedAt: new Date(),
                  thumbnails: []
                }
              }
            ]}
          >
            {PreviewComponent}
          </People>
        )
      case 'transcript':
        return <Transcript>{PreviewComponent}</Transcript>
      case 'timeline':
        return <Timeline />
      case 'gallery':
        return <Gallery>{PreviewComponent}</Gallery>
      case 'files':
        return <Files />
      case 'links':
        return <Links />
      default:
        return (
          <Info story={story} updateStory={updateStory}>
            {PreviewComponent}
          </Info>
        )
    }
  }

  return (
    <LoadingArea isLoading={isLoading}>
      <ContentArea>
        <Link to={'/a/stories'}>
          <Icon name="arrow left" />
          Back
        </Link>
        <Header as="h1">Story</Header>
        <Menu tab={tab as string} onChange={handleTabChange} />
        {stiwchRender()}
      </ContentArea>
    </LoadingArea>
  )
}

export default StoryDetails
