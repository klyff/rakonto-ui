import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { Link, useHistory } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import UploadIcon from '@mui/icons-material/Upload'
import LoadingButton from '@mui/lab/LoadingButton'
import ImageIcon from '@mui/icons-material/Image'
import DeleteIcon from '@mui/icons-material/Delete'
import DownloadIcon from '@mui/icons-material/Download'
import { AudioDetails, CollectionType, ImageType, StoryType, VideoDetails } from '../../../../lib/types'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'
import api from '../../../../lib/api'
import { SimpleDialogContext } from '../../../../components/SimpleDialog'
import { SimpleSnackbarContext } from '../../../../components/SimpleSnackbar'
import CollectionMove from './CollectionMove'
import { ChangeMediaContext } from '../../../../components/ChangeMedia'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreIcon from '@mui/icons-material/MoreVert'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'

interface iEditBar {
  collection: CollectionType
  canEdit: boolean
  media: VideoDetails | AudioDetails
  id: string
  reload: () => void
  loadPublished?: boolean
  story?: StoryType
}

const EditBar: React.FC<iEditBar> = ({ collection, canEdit, id, reload, loadPublished, media, story }) => {
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const { actions: dialogActions } = useContext(SimpleDialogContext)
  const { actions: mediaActions } = useContext(ChangeMediaContext)
  const history = useHistory()
  const [progress, setProgress] = useState<number>(0)
  const [published, setPublished] = useState<boolean>(loadPublished || false)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const fetchIsPublished = async () => {
    setPublished(await api.isStoryPublished(id))
  }

  const handlePublished = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await api.updateStoryStatus(id, event.target.checked)
      fetchIsPublished()
    } catch (error) {
      // @ts-ignore
      const { data } = error

      if (data.code) {
        snackActions.open(data.message)
        return
      }
      snackActions.open(`Problem to make this ${event.target.checked ? 'draft' : 'published'}`)
    }
  }

  useEffect(() => {
    fetchIsPublished()
  }, [id])

  const updateCover = async (image: ImageType) => {
    try {
      await api.updateStoryCover(id, image.id)
      reload()
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

  const onDrop: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void =
    async acceptedFiles => {
      try {
        const selectedFile = acceptedFiles[0]
        const image = await api.uploadImage(selectedFile, event => {
          setProgress(Math.round((event.loaded * 100) / event.total))
        })
        setProgress(0)
        updateCover(image)
      } catch (error) {
        snackActions.open('Something was wrong! please try again.')
        setProgress(0)
      }
    }

  const {
    getRootProps,
    getInputProps,
    open: openUpload
  } = useDropzone({
    onDrop,
    noClick: true,
    noDrag: true,
    accept: 'image/png, image/jpeg'
  })

  const handleDelete = () => {
    dialogActions.open(
      'Delete forever',
      <>
        <Typography fontWeight="700">Are you sure you want to delete this story?</Typography>
        <Typography> This action cannot be undone.</Typography>
      </>,
      {
        okText: 'Yes, delete',
        showOk: true,
        cancelText: 'No, keep as is'
      },
      async value => {
        if (value) {
          try {
            await api.deleteStory(id)
            history.push('/a/my-library')
          } catch (error) {
            // @ts-ignore
            const { data } = error
            if (data.code) {
              snackActions.open(data.message)
              return
            }
            snackActions.open('Something was wrong! please try again.')
          }
        }
      }
    )
  }

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <CollectionMove
        onClick={() => {
          handleMobileMenuClose()
        }}
        currentCollectionId={collection.id}
        storyId={id}
        reload={reload}
        isMenu
      />
      <MenuItem
        onClick={() => {
          mediaActions.open(id)
          handleMobileMenuClose()
        }}
      >
        Replace video/audio
      </MenuItem>
      <MenuItem
        onClick={() => {
          openUpload()
          handleMobileMenuClose()
        }}
      >
        <Box {...getRootProps()}>
          <input {...getInputProps()} />
          Thumbnail
        </Box>
      </MenuItem>
      <MenuItem
        onClick={() => {
          window.location.assign(media.url as string)
          handleMobileMenuClose()
        }}
      >
        Download
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleDelete()
          handleMobileMenuClose()
        }}
      >
        Delete
      </MenuItem>
    </Menu>
  )
  return (
    <Box
      sx={{
        width: '100%',
        padding: '0 24px',
        marginBottom: 3,
        height: 65,
        display: 'flex',
        alignItems: 'center'
      }}
      component={Paper}
    >
      <Box
        component={Link}
        to={`/a/collections/${collection?.id}?storyId=${id}`}
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowBackIcon />
        <Typography sx={{ display: { xs: 'none', md: 'inherit' }, paddingLeft: 1 }}>{collection?.title}</Typography>
        <Typography variant="caption" sx={{ display: { xs: 'inherit', md: 'none' }, paddingLeft: 1 }}>
          {collection?.title}
        </Typography>
      </Box>
      {canEdit && (
        <Stack direction="row">
          <Box
            sx={{
              width: '134px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={published} onChange={handlePublished} />}
                label={published ? 'Published' : 'Draft'}
              />
            </FormGroup>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }} component="span">
            <CollectionMove currentCollectionId={collection.id} storyId={id} reload={reload} />
          </Box>
          <Button
            sx={{ display: { xs: 'none', md: 'flex' } }}
            color="secondary"
            onClick={() => mediaActions.open(id)}
            startIcon={<UploadIcon />}
          >
            Replace video/audio
          </Button>
          <Box {...getRootProps()} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <input {...getInputProps()} />
            <LoadingButton
              loadingPosition="start"
              loading={!!progress}
              onClick={openUpload}
              color="secondary"
              startIcon={<ImageIcon />}
            >
              Thumbnail
            </LoadingButton>
          </Box>

          <PopupState variant="popover" popupId="demo-popup-menu">
            {popupState => (
              <React.Fragment>
                <Button
                  startIcon={<DownloadIcon />}
                  sx={{ display: { xs: 'none', md: 'flex' } }}
                  color="secondary"
                  {...bindTrigger(popupState)}
                >
                  Download
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem
                    onClick={() => {
                      const url = new URL(story!.downloadUrl)
                      window.location.assign(url)
                      popupState.close()
                    }}
                  >
                    Original
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      const url = new URL(story!.downloadUrl)
                      url.search = new URLSearchParams({ resolution: '720p' }).toString()
                      window.location.assign(url)

                      popupState.close()
                    }}
                  >
                    720p
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>

          <Button
            sx={{ display: { xs: 'none', md: 'flex' } }}
            color="secondary"
            onClick={handleDelete}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Stack>
      )}
      {renderMobileMenu}
    </Box>
  )
}

export default EditBar
