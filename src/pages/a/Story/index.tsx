import React, { useEffect, useState, useContext } from 'react'
import { ImageType, StoryType, StoryUpdateType } from '../../../lib/types'
import Player from '../../../components/Player'
import Box from '@mui/material/Box'
import About from '../../../components/About'
import { ApiContext } from '../../../lib/api'
import MetaTags from 'react-meta-tags'
import { RouteComponentProps } from 'react-router-dom'
import CircularLoadingCentred from '../../../components/CircularLoadingCentred'
import Cover from '../../../components/Cover'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import Peoples from '../Collection/Peoples'
import Timelines from '../Collection/Timelines'
import useUser from '../../../components/hooks/useUser'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import Comments from '../../../components/Comments'

const Story: React.FC<RouteComponentProps<{ storyId: string }>> = ({ match }) => {
  const { api } = useContext(ApiContext)
  const user = useUser()
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const { storyId } = match.params
  const [tab, setTab] = useState<string>('')
  const [play, setPlay] = useState<boolean>(false)
  const [story, setStory] = useState<StoryType | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isOwner, setIsOwner] = useState<boolean>(false)

  const computeStory = (value: StoryType) => {
    setStory(value)
  }

  useEffect(() => {
    setIsLoading(true)

    const fetch = async () => {
      const result = await api({ errorBoundary: true }).getStory(storyId)
      computeStory(result)
      setIsLoading(false)
      if (result.owner.id === user?.id) {
        setIsOwner(true)
      }
    }
    fetch()
  }, [])

  const updateStory = async (formData: StoryUpdateType) => {
    try {
      const result = await api().updateStory(storyId, formData)
      computeStory(result)
    } catch (error) {
      // @ts-ignore
      const { data } = error
      if (data.code === '1018') {
        snackActions.open('This collection cannot be edited!')
        throw error
      }
      snackActions.open('Something was wrong! please try again.')
      throw error
    }
  }

  if (isLoading) {
    return <CircularLoadingCentred />
  }

  const {
    type,
    video,
    audio,
    thumbnailUrl,
    subtitles,
    owner,
    title,
    description,
    persons,
    timelineEntries,
    collections,
    watchers
  } = story as StoryType

  const handlePlay = () => {
    setPlay(true)
  }

  const onTabClick = (tab = '') => {
    setTab(tab)
  }

  const updateCover = async (image: ImageType) => {
    await updateStory({
      title,
      description,
      coverId: image.id,
      collections: collections.map(collection => collection.id)
    })
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
        <Box sx={{ width: '100%', height: '100%' }}>
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
              canEdit={isOwner}
              onChange={updateCover}
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
            <Tab label="Peoples" value="peoples" onClick={() => onTabClick('peoples')} />
            <Tab label="Timelines" value="timelines" onClick={() => onTabClick('timelines')} />
            <Tab label="Places" value="places" onClick={() => onTabClick('places')} />
            <Tab label="Photos" value="photos" onClick={() => onTabClick('photos')} />
            <Tab label="Files" value="files" onClick={() => onTabClick('files')} />
            <Tab label="Links" value="links" onClick={() => onTabClick('links')} />
          </Box>
          <TabPanel sx={{ height: '100%' }} value="about">
            <About update={updateStory} canEdit={isOwner} title={title} id={storyId} description={description}>
              <Comments type={'story'} id={storyId} watchers={watchers} />
            </About>
          </TabPanel>
          <TabPanel sx={{ height: '100%' }} value="peoples">
            <Peoples persons={persons} />
          </TabPanel>
          <TabPanel sx={{ height: '100%' }} value="timelines">
            <Timelines timelines={timelineEntries} />
          </TabPanel>
          <TabPanel sx={{ height: '100%' }} value="places">
            places
          </TabPanel>
          <TabPanel sx={{ height: '100%' }} value="photos">
            photos
          </TabPanel>
          <TabPanel sx={{ height: '100%' }} value="files">
            files
          </TabPanel>
          <TabPanel sx={{ height: '100%' }} value="links">
            links
          </TabPanel>
        </Box>
      </Box>
    </>
  )
}

export default Story
