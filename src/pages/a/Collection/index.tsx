import React, { useEffect, useState, useContext } from 'react'
import {
  CollectionFormType,
  CollectionType,
  FileType,
  GalleryType,
  LinkType,
  PersonType,
  StoryType,
  TimelineType,
  WatcherType
} from '../../../lib/types'
import Player from '../../../components/Player'
import Cover from '../../../components/Cover'
import Box from '@mui/material/Box'
import About from '../../../components/About'
import TabPanel from '@mui/lab/TabPanel'
import Peoples from './Peoples'
import Timelines from './Timelines'
import Stories from './Stories'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import Tab from '@mui/material/Tab'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { ApiContext } from '../../../lib/api'
import { parse } from 'qs'
import MetaTags from 'react-meta-tags'
import CircularLoadingCentred from '../../../components/CircularLoadingCentred'
import useUser from '../../../components/hooks/useUser'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import Comments from '../../../components/Comments'

const Collection: React.FC<RouteComponentProps<{ collectionId: string }>> = ({ match, history, location }) => {
  const { api } = useContext(ApiContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const user = useUser()
  const { collectionId } = match.params
  const { autoplay, storyId } = parse(location?.search as string, { ignoreQueryPrefix: true })
  const [collection, setCollection] = useState<CollectionType | null>(null)
  const [story, setStory] = useState<StoryType | null>(null)
  const [accumulator, setAccumulator] = useState<{
    persons: PersonType[]
    files: FileType[]
    links: LinkType[]
    galleryEntries: GalleryType[]
    timelineEntries: TimelineType[]
    watchers: WatcherType[]
  }>({
    persons: [],
    files: [],
    links: [],
    galleryEntries: [],
    timelineEntries: [],
    watchers: []
  })
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [play, setPlay] = useState<boolean>(!!autoplay)
  const [tab, setTab] = useState<string>('')
  const [isOwner, setIsOwner] = useState<boolean>(false)

  const computeCollection = (value: CollectionType) => {
    const acc = value?.stories?.reduce<{
      persons: PersonType[]
      files: FileType[]
      links: LinkType[]
      galleryEntries: GalleryType[]
      timelineEntries: TimelineType[]
      watchers: WatcherType[]
    }>(
      (acc, story) => {
        acc.timelineEntries.push(...story.timelineEntries)
        acc.files.push(...story.files)
        acc.links.push(...story.links)
        acc.galleryEntries.push(...story.galleryEntries)
        acc.persons.push(...story.persons)
        acc.watchers.push(...story.watchers)
        return acc
      },
      {
        persons: [],
        files: [],
        links: [],
        galleryEntries: [],
        timelineEntries: [],
        watchers: []
      }
    )
    setStory(value.stories.find(story => story.id === storyId) || value.stories[0])
    setAccumulator(acc)
    setCollection(value)
    setIsLoading(false)
    if (value.owner.id === user?.id) {
      setIsOwner(true)
    }
  }

  const updateCollection = async (formData: CollectionFormType) => {
    try {
      const result = await api().updateCollection(collectionId, formData)
      computeCollection(result)
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

  useEffect(() => {
    setIsLoading(true)
    const fetch = async () => {
      const result = await api().getCollection(collectionId)
      computeCollection(result)
    }
    fetch()
  }, [])

  useEffect(() => {
    if (!collection) return
    setStory(collection.stories.find(story => story.id === storyId) || collection.stories[0])
  }, [collection, storyId])

  if (isLoading) {
    return <CircularLoadingCentred />
  }

  if (!collection || !story) {
    return <Redirect to={'/a/404'} />
  }

  const { thumbnailUrl, title, description, stories, owner } = collection

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
        <Box sx={{ width: '100%', height: '100%' }}>
          {play ? (
            <Player
              subtitles={story?.subtitles || []}
              type={story?.type}
              media={story?.video || story?.audio}
              cover={story?.thumbnailUrl}
              autoplay={!!autoplay}
            />
          ) : (
            <Cover
              author={collection.owner}
              src={thumbnailUrl}
              title={title}
              description={description}
              onClick={handlePlay}
              buttonLabel="View first video"
            />
          )}
        </Box>
        <Box
          component={TabContext}
          value={(tab as string) || 'stories'}
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
            <Tab label="Stories" value="stories" onClick={() => onTabClick('stories')} />
            <Tab label="About" value="about" onClick={() => onTabClick('about')} />
            <Tab label="Peoples" value="peoples" onClick={() => onTabClick('peoples')} />
            <Tab label="Timelines" value="timelines" onClick={() => onTabClick('timelines')} />
            <Tab label="Places" value="places" onClick={() => onTabClick('places')} />
            <Tab label="Photos" value="photos" onClick={() => onTabClick('photos')} />
            <Tab label="Files" value="files" onClick={() => onTabClick('files')} />
            <Tab label="Links" value="links" onClick={() => onTabClick('links')} />
          </Box>
          <TabPanel sx={{ height: '100%' }} value="stories">
            <Stories collectionId={collectionId} selectedStory={story.id} playing={play} stories={stories} />
          </TabPanel>
          <TabPanel sx={{ height: '100%' }} value="about">
            <About
              update={updateCollection}
              canEdit={isOwner}
              title={title}
              id={collectionId}
              description={description}
            >
              <Comments type={'collection'} id={collectionId} watchers={accumulator.watchers} />
            </About>
          </TabPanel>
          <TabPanel sx={{ height: '100%' }} value="peoples">
            <Peoples persons={accumulator.persons} />
          </TabPanel>
          <TabPanel sx={{ height: '100%' }} value="timelines">
            <Timelines timelines={accumulator.timelineEntries} />
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

export default Collection
