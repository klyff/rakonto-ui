import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { SimpleDialogContext } from '../../../../components/SimpleDialog'
import Button from '@mui/material/Button'
import api from '../../../../lib/api'
import { SimpleSnackbarContext } from '../../../../components/SimpleSnackbar'
import { SubtitleType } from '../../../../lib/types'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Link from '@mui/material/Link'
import CreateSubtitle from './CreateSubtitle'

interface iSubtitles {
  canEdit: boolean
  storyId: string
}

const Subtitles: React.FC<iSubtitles> = ({ canEdit, storyId }) => {
  const { actions: simpleDialogActions } = useContext(SimpleDialogContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [subtitles, setSubtitles] = useState<SubtitleType[]>([])

  const fetch = async () => {
    const result = await api.getSubtitles(0, 10000, [storyId])
    setSubtitles(result.content)
  }

  useEffect(() => {
    fetch()
  }, [])

  const handleDelete = async (subtitle?: SubtitleType) => {
    if (!subtitle) {
      snackActions.open('Something was wrong! please try again.')
      return
    }
    simpleDialogActions.open(
      'Delete subtitle',
      <>
        <Typography component="span">Are you sure want to delete the subtitle</Typography>
        <Typography fontWeight="700" component="span">{` "${subtitle.originalName}" `}</Typography>
        <Typography component="span">from this story?</Typography>
      </>,
      { okText: 'Yes, delete', showOk: true, cancelText: 'Back' },
      async success => {
        try {
          if (success) {
            await api.deleteSubtitle(subtitle.id)
            setSubtitles(subtitles.filter(p => p.id !== subtitle.id))
            snackActions.open(`${subtitle.language} removed from this story!`)
          }
        } catch (error) {
          // @ts-ignore
          const { data } = error
          if (data.code) {
            snackActions.open(`Error to add ${subtitle.language} to this story!`)
            return
          }
          snackActions.open('Something was wrong! please try again.')
        }
      }
    )
  }

  const handleCloseDialog = (subtitle?: SubtitleType) => {
    if (subtitle) {
      setSubtitles([...subtitles, subtitle])
    }
    setIsOpen(false)
  }

  return (
    <Box
      component={Paper}
      sx={{
        width: '100%',
        display: 'flex',
        padding: 3,
        flexFlow: 'column'
      }}
    >
      {canEdit && (
        <>
          {isOpen && <CreateSubtitle storyId={storyId} onClose={handleCloseDialog} />}
          <Box>
            <Typography sx={{ marginBottom: 3 }} gutterBottom>
              Add a subtitle to enhance your story.
            </Typography>
            <Button variant="outlined" onClick={() => setIsOpen(true)} sx={{ mt: 1, mr: 1 }}>
              Create subtitle
            </Button>
          </Box>
        </>
      )}

      <Divider sx={{ margin: '24px 0' }} />
      <Box
        sx={{
          marginBottom: 3
        }}
      >
        {subtitles.length ? (
          <Box sx={{ width: '100%', minHeight: 400 }}>
            <List>
              {subtitles.map(subtitle => (
                <ListItem
                  key={subtitle.id}
                  secondaryAction={
                    canEdit && (
                      <IconButton onClick={() => handleDelete(subtitle)} sx={{ color: 'white' }}>
                        <DeleteIcon />
                      </IconButton>
                    )
                  }
                >
                  <ListItemText
                    primary={
                      <Link href={subtitle.url}>
                        {subtitle.language.charAt(0).toUpperCase() + subtitle.language.slice(1)}
                      </Link>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <Typography align="center">No subtitles here.</Typography>
        )}
      </Box>
    </Box>
  )
}

export default Subtitles
