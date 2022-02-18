import React, { useContext, useEffect, useState } from 'react'
import { AssetTypes, StoryType, StoryUpdateType } from '../../../lib/types'
import Player from '../../../components/Player'
import Box from '@mui/material/Box'
import About from './About'
import api from '../../../lib/api'
import MetaTags from 'react-meta-tags'
import { RouteComponentProps } from 'react-router-dom'
import CircularLoadingCentred from '../../../components/CircularLoadingCentred'
import Cover from '../../../components/Cover'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import People from './People'
import Places from './Places'
import Timeline from './Timeline'
import Transcript from './Transcript'
import Photos from './Photos'
import Files from './Files'
import Subtitles from './Subtitles'
import Links from './Links'
import useUser from '../../../components/hooks/useUser'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import Comments from '../../../components/Comments'
import EditBar from './EditBar'
import { QueueProcessorContext } from '../../../components/QueueProcessor'

const Story: React.FC<RouteComponentProps<{ storyId: string }>> = ({ match, history }) => {
  const user = useUser()
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const { storyId } = match.params
  const [tab, setTab] = useState<string>('')
  const [play, setPlay] = useState<boolean>(false)
  const [story, setStory] = useState<StoryType | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isOwner, setIsOwner] = useState<boolean>(false)
  const { store: processorList } = useContext(QueueProcessorContext)

  const computeStory = (value: StoryType) => {
    setStory(value)
  }

  const fetch = async () => {
    try {
      const result = await api.getStory(storyId)
      computeStory(result)
      setIsLoading(false)
      if (result.owner.id === user?.id) {
        setIsOwner(true)
      }
    } catch (error) {
      history.push('/a/my-library')
    }
  }

  useEffect(() => {
    setIsLoading(true)
    fetch()
  }, [])

  useEffect(() => {
    processorList.forEach(async object => {
      if (object.finished && object.id === storyId) {
        setTimeout(async () => {
          setIsLoading(true)
          fetch()
        }, 2000)
      }
    })
  }, [processorList])

  const updateStory = async (formData: StoryUpdateType) => {
    try {
      const result = await api.updateStory(storyId, formData)
      computeStory(result)
    } catch (error) {
      // @ts-ignore
      const { data } = error
      if (data.code === '1018') {
        snackActions.open('This story cannot be edited!')
        throw error
      }
      snackActions.open('Something was wrong! please try again.')
      throw error
    }
  }

  if (isLoading) {
    return <CircularLoadingCentred />
  }

  const { type, video, audio, thumbnailUrl, subtitles, owner, title, description, collections, published, watchers } =
    story as StoryType

  const handlePlay = () => {
    setPlay(true)
  }

  const onTabClick = (tab = '') => {
    setTab(tab)
  }

  return (
    <>
      <MetaTags>
        <title>Rakonto - {title}</title>
        <meta property="description" content={description || ''} />
        <meta property="creator" content={owner.firstName || ''} />
        <meta property="publisher" content={'Rakonto'} />
        <meta property="og:image" content={thumbnailUrl} />
      </MetaTags>
      <Box
        sx={{
          width: '100%',
          height: `100%`,
          display: 'flex',
          flexFlow: 'column'
        }}
      >
        <Box sx={{ width: '100%', height: '100%', maxHeight: '720px' }}>
          {play ? (
            <Player subtitles={subtitles || []} type={type} media={video || audio} cover={thumbnailUrl} />
          ) : (
            <Cover
              author={owner}
              src={thumbnailUrl}
              title={title}
              description={description}
              onClick={handlePlay}
              buttonLabel="View video"
            />
          )}
        </Box>
        <Box
          component={TabContext}
          value={(tab as string) || 'about'}
          sx={{
            width: '100%',
            height: '100%'
          }}
        >
          <Box
            component={TabList}
            variant="scrollable"
            sx={{
              backgroundColor: 'background.paper',
              boxShadow: 6
            }}
          >
            <Tab label="About" value="about" onClick={() => onTabClick('about')} />
            <Tab label="Transcript" value="transcript" onClick={() => onTabClick('transcript')} />
            <Tab label="People" value="people" onClick={() => onTabClick('people')} />
            <Tab label="Places" value="places" onClick={() => onTabClick('places')} />
            <Tab label="Timelines" value="timelines" onClick={() => onTabClick('timelines')} />
            <Tab label="Photos" value="photos" onClick={() => onTabClick('photos')} />
            <Tab label="Files" value="files" onClick={() => onTabClick('files')} />
            <Tab label="Links" value="links" onClick={() => onTabClick('links')} />
            <Tab label="Subtitles" value="subtitles" onClick={() => onTabClick('subtitles')} />
          </Box>
          <Box
            sx={{
              width: '100%',
              padding: 3
            }}
          >
            <EditBar
              id={storyId}
              canEdit={isOwner}
              reload={fetch}
              loadPublished={published}
              collection={collections[0]}
            />
            <TabPanel sx={{ height: '100%', padding: 'unset' }} value="about">
              <About update={updateStory} canEdit={isOwner} title={title} id={storyId} description={description}>
                <Comments type={AssetTypes.story} id={storyId} watchers={watchers} />
              </About>
            </TabPanel>
            <TabPanel sx={{ height: '100%', padding: 'unset' }} value="people">
              <People storyId={storyId} canEdit={isOwner} />
            </TabPanel>
            <TabPanel sx={{ height: '100%', padding: 'unset' }} value="timelines">
              <Timeline storyId={storyId} canEdit={isOwner} />
            </TabPanel>
            <TabPanel sx={{ height: '100%', padding: 'unset' }} value="places">
              <Places storyId={storyId} canEdit={isOwner} />
            </TabPanel>
            <TabPanel sx={{ height: '100%', padding: 'unset' }} value="transcript">
              <Transcript storyId={storyId} canEdit={isOwner} refetch={fetch} />
            </TabPanel>
            <TabPanel sx={{ height: '100%', padding: 'unset' }} value="photos">
              <Photos storyId={storyId} canEdit={isOwner} />
            </TabPanel>
            <TabPanel sx={{ height: '100%', padding: 'unset' }} value="files">
              <Files storyId={storyId} canEdit={isOwner} />
            </TabPanel>
            <TabPanel sx={{ height: '100%', padding: 'unset' }} value="links">
              <Links storyId={storyId} canEdit={isOwner} />
            </TabPanel>
            {isOwner && (
              <TabPanel sx={{ height: '100%', padding: 'unset' }} value="subtitles">
                <Subtitles storyId={storyId} canEdit={isOwner} refetch={fetch} />
              </TabPanel>
            )}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Story
