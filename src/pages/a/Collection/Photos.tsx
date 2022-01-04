import React, { Fragment, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import { GalleryType, StoryType } from '../../../lib/types'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

interface iPhotos {
  list: StoryType[]
}

const Photos: React.FC<iPhotos> = ({ list }) => {
  const [gallery, setGallery] = useState<(GalleryType & { storyId: string; storyTitle: string })[]>([])
  useEffect(() => {
    list.forEach(story =>
      story.galleryEntries.forEach(g => {
        setGallery(old => [...old, { ...g, storyId: story.id, storyTitle: story.title }])
      })
    )
  }, [list])
  return (
    <Box
      sx={{
        marginBottom: 3
      }}
    >
      {gallery.length ? (
        <ImageList variant="masonry" cols={3} gap={8}>
          {gallery.map(photo => (
            <ImageListItem key={photo.id}>
              <img
                src={`${photo.image.url}`}
                srcSet={`${photo.image.url}`}
                alt={photo.image.originalName}
                loading="lazy"
              />
              <ImageListItemBar
                position="below"
                subtitle={
                  <Link href={`/a/stories/${photo.storyId}`} variant="caption">
                    {photo.storyTitle}
                  </Link>
                }
                title={photo.image.originalName}
                actionPosition="right"
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Typography sx={{ padding: '16px 0px' }} align="center">
          No images here.
        </Typography>
      )}
    </Box>
  )
}

export default Photos
