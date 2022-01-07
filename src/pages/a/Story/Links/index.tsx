import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { SimpleDialogContext } from '../../../../components/SimpleDialog'
import Button from '@mui/material/Button'
import api from '../../../../lib/api'
import { SimpleSnackbarContext } from '../../../../components/SimpleSnackbar'
import LinkPreview from '../../../../components/LinkPreview'
import { LinkType } from '../../../../lib/types'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import CreateLink from './CreateLink'

interface iLinks {
  canEdit: boolean
  storyId: string
}

const Links: React.FC<iLinks> = ({ canEdit, storyId }) => {
  const { actions: simpleDialogActions } = useContext(SimpleDialogContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [links, setLinks] = useState<LinkType[]>([])

  const fetch = async () => {
    const result = await api.getLinks(0, 10000, [storyId])
    setLinks(result.content)
  }

  useEffect(() => {
    fetch()
  }, [])

  const handleDelete = async (link?: LinkType) => {
    if (!link) {
      snackActions.open('Something was wrong! please try again.')
      return
    }
    simpleDialogActions.open(
      'Delete link',
      <>
        <Typography component="span">Are you sure want to delete the link</Typography>
        <Typography fontWeight="700" component="span">{` "${link.url}" `}</Typography>
        <Typography component="span">from this story?</Typography>
      </>,
      { okText: 'Yes, delete', showOk: true, cancelText: 'Back' },
      async success => {
        try {
          if (success) {
            await api.deleteLink(link.id)
            setLinks(links.filter(p => p.id !== link.id))
            snackActions.open(`${link.url} removed from this story!`)
          }
        } catch (error) {
          // @ts-ignore
          const { data } = error
          if (data.code) {
            snackActions.open(`Error to add ${link.url} to this story!`)
            return
          }
          snackActions.open('Something was wrong! please try again.')
        }
      }
    )
  }

  const handleCloseDialog = (link?: LinkType) => {
    if (link) {
      setLinks([...links, link])
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
          {isOpen && <CreateLink storyId={storyId} onClose={handleCloseDialog} />}
          <Box>
            <Typography sx={{ marginBottom: 3 }} gutterBottom>
              Add a link to enhance your story.
            </Typography>
            <Button variant="outlined" onClick={() => setIsOpen(true)} sx={{ mt: 1, mr: 1 }}>
              Create link
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
        {links.length ? (
          <Box sx={{ width: '100%' }}>
            <ul>
              {links.map(link => (
                <LinkPreview
                  key={link.id}
                  link={link}
                  action={
                    canEdit && (
                      <IconButton onClick={() => handleDelete(link)} sx={{ color: 'white' }}>
                        <DeleteIcon />
                      </IconButton>
                    )
                  }
                />
              ))}
            </ul>
          </Box>
        ) : (
          <Typography align="center">No links here.</Typography>
        )}
      </Box>
    </Box>
  )
}

export default Links
