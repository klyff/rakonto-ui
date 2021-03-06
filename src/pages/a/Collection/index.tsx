import React, { useContext, useEffect, useState } from 'react'
import { AssetTypes, CollectionFormType, CollectionType, ImageType, StoryType } from '../../../lib/types'
import Player from '../../../components/Player'
import Cover from '../../../components/Cover'
import Box from '@mui/material/Box'
import Content from './Content'
import TabPanel from '@mui/lab/TabPanel'
import People from './People'
import Places from './Places'
import Timelines from './Timelines'
import Stories from './Stories'
import Photos from './Photos'
import Links from './Links'
import Files from './Files'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import Tab from '@mui/material/Tab'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import api from '../../../lib/api'
import { parse } from 'qs'
import MetaTags from 'react-meta-tags'
import CircularLoadingCentred from '../../../components/CircularLoadingCentred'
import useUser from '../../../components/UserProvider/useUser'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import Comments from '../../../components/Comments'
import Paper from '@mui/material/Paper'
import EditBar from './EditBar'

const Collection: React.FC<RouteComponentProps<{ collectionId: string }>> = ({ match, history, location }) => {
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const { user } = useUser()
  const { collectionId } = match.params
  const { autoplay, storyId } = parse(location?.search as string, { ignoreQueryPrefix: true })
  const [collection, setCollection] = useState<CollectionType | null>(null)
  const [story, setStory] = useState<StoryType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [play, setPlay] = useState<boolean>(!!autoplay)
  const [tab, setTab] = useState<string>('')
  const [isOwner, setIsOwner] = useState<boolean>(false)

  useEffect(() => {
    setPlay(!!autoplay)
  }, [autoplay])

  const computeCollection = (value: CollectionType) => {
    setCollection(value)
    setIsLoading(false)
  }

  const updateCollection = async (formData: CollectionFormType) => {
    try {
      const result = await api.updateCollection(collectionId, formData)
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

  const fetch = async () => {
    const result = await api.getCollection(collectionId)
    computeCollection(result)
  }

  useEffect(() => {
    setIsLoading(true)
    fetch()
  }, [])

  useEffect(() => {
    if (collection?.owner.id === user?.id) {
      setIsOwner(true)
    }
  }, [user, collection])

  useEffect(() => {
    if (!collection?.id || !storyId) return
    setStory(collection.stories.find(story => story.id === storyId) || collection.stories[0])
  }, [storyId, collection])

  if (isLoading) {
    return <CircularLoadingCentred />
  }

  if (!collection) {
    return <Redirect to={'/a/404'} />
  }

  const { thumbnailUrl, title, description, stories, owner, type } = collection

  const handlePlay = () => {
    setPlay(true)
  }

  const onTabClick = (tab = '') => {
    setTab(tab)
  }

  const updateCover = async (image: ImageType) => {
    try {
      await api.updateCollectionCover(collectionId, image.id)
      fetch()
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
              subtitle={collection.type}
              src={thumbnailUrl}
              title={title}
              description={description}
              onClick={handlePlay}
              hidePlayButton={!story?.id}
              buttonLabel="View most recent story"
              date={collection.updatedAt}
            />
          )}
        </Box>
        <Box
          component={TabContext}
          value={(tab as string) || 'content'}
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
            <Tab label="Content" value="content" onClick={() => onTabClick('content')} />
            <Tab label="Comments" value="comments" onClick={() => onTabClick('comments')} />
            <Tab label="People" value="people" onClick={() => onTabClick('people')} />
            <Tab label="Places" value="places" onClick={() => onTabClick('places')} />
            <Tab label="Timelines" value="timelines" onClick={() => onTabClick('timelines')} />
            <Tab label="Photos" value="photos" onClick={() => onTabClick('photos')} />
            <Tab label="Files" value="files" onClick={() => onTabClick('files')} />
            <Tab label="Links" value="links" onClick={() => onTabClick('links')} />
          </Box>
          <Box
            sx={{
              width: '100%',
              padding: 3
            }}
          >
            <EditBar
              id={collectionId}
              refetch={fetch}
              onChange={updateCover}
              canEdit={isOwner}
              collection={collection}
            />
            <TabPanel sx={{ height: '100%', padding: 'unset' }} value="content">
              <Content
                type={type}
                update={updateCollection}
                canEdit={isOwner}
                title={title}
                id={collectionId}
                description={description}
              >
                <Stories collectionId={collectionId} selectedStory={story?.id} playing={play} stories={stories} />
              </Content>
            </TabPanel>
            <TabPanel sx={{ height: '100%', padding: 'unset' }} value="comments">
              <Box component={Paper} sx={{ marginTop: 3 }}>
                <Comments type={AssetTypes.collection} id={collectionId} watchers={[]} />
              </Box>
            </TabPanel>
            <TabPanel sx={{ height: '100%', padding: 'unset' }} value="people">
              <People list={collection.stories} />
            </TabPanel>
            <TabPanel sx={{ height: '100%', padding: 'unset' }} value="timelines">
              <Timelines list={collection.stories} />
            </TabPanel>
            <TabPanel sx={{ height: '100%', padding: 'unset' }} value="places">
              <Places list={stories} />
            </TabPanel>
            <TabPanel sx={{ height: '100%', padding: 'unset' }} value="photos">
              <Photos list={stories} />
            </TabPanel>
            <TabPanel sx={{ height: '100%', padding: 'unset' }} value="files">
              <Files list={stories} />
            </TabPanel>
            <TabPanel sx={{ height: '100%', padding: 'unset' }} value="links">
              <Links list={stories} />
            </TabPanel>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Collection
