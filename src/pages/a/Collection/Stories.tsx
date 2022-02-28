import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { StoryType } from '../../../lib/types'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

interface iStory {
  story: StoryType
  collectionId: string
  playing: boolean
  isSelected: boolean
}

const StoryTile: React.FC<iStory> = ({ story, collectionId, playing, isSelected }) => {
  const history = useHistory()
  const [hover, setHover] = useState<boolean>(false)

  return (
    <Box sx={{ display: 'flex', maxHeight: 200, marginBottom: 1 }} key={story.id}>
      <Box sx={{ position: 'relative' }}>
        <Box
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          sx={{ position: 'relative', width: 327, height: 200 }}
        >
          <Box
            component="img"
            sx={{
              position: 'absolute',
              backgroundColor: 'action.selected',
              objectFit: 'cover',
              height: '100%',
              width: '100%'
            }}
            src={story.thumbnailUrl || '/images/CoverDefault.png'}
            alt={story.title}
          />
          {isSelected && (
            <>
              <Box
                sx={{
                  position: 'absolute',
                  backgroundColor: 'action.selected',
                  height: '100%',
                  width: '100%',
                  top: 0
                }}
              />
              <Box
                sx={{
                  cursor: 'default',
                  color: 'common.black',
                  position: 'absolute',
                  backgroundColor: 'primary.main',
                  minWidth: 48,
                  paddingRight: 2,
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  borderRadius: '0px 40px 40px 0px',
                  top: '10%',
                  left: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <PlayArrowIcon color="inherit" /> {playing && 'Playing'}
              </Box>
            </>
          )}
          {!isSelected && hover && (
            <Button
              variant="contained"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '20px 16px'
              }}
              onClick={() => {
                history.push(`/a/collections/${collectionId}?storyId=${story.id}&autoplay=true`)
              }}
            >
              <PlayArrowIcon />
            </Button>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column',
          width: '100%',
          padding: 3,
          backgroundColor: playing ? 'action.selected' : 'default'
        }}
      >
        <Typography sx={{ fontWeight: '700' }} variant="h5" gutterBottom>
          {`${story.title}${!!story.submission && ` by ${story.submission.name}`}`}
        </Typography>
        <Typography
          sx={{
            fontWeight: '400'
          }}
          className="line-clamp"
          variant="h6"
        >
          {story.description}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginRight: 3
        }}
      >
        <IconButton component={Link} to={`/a/stories/${story.id}`}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

interface iStories {
  collectionId: string
  stories: StoryType[]
  playing: boolean
  selectedStory: string | undefined
}

const Stories: React.FC<iStories> = ({ selectedStory, collectionId, stories, playing }) => {
  if (!selectedStory) return null
  return (
    <Box sx={{ display: 'flex', flexFlow: 'column', height: '100%' }}>
      {stories
        .filter(story => story.ready)
        .map(story => (
          <StoryTile
            collectionId={collectionId}
            key={story.id}
            story={story}
            isSelected={story.id === selectedStory}
            playing={playing}
          />
        ))}
    </Box>
  )
}

export default Stories
