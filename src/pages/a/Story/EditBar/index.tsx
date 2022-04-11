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
import UploadFileIcon from '@mui/icons-material/UploadFile'
import DeleteIcon from '@mui/icons-material/Delete'
import DownloadIcon from '@mui/icons-material/Download'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { AssetTypes, AudioDetails, ImageType, StoryType, UserType, VideoDetails } from '../../../../lib/types'
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
import Cookies from 'js-cookie'
import { StepInviteContributorContext } from '../../../../components/StepInviteContributor'
import Share from '../../../../components/Share'
import ShareIcon from '@mui/icons-material/Share'

interface iEditBar {
  isEditor: boolean
  isOwner: boolean
  media: VideoDetails | AudioDetails
  id: string
  reload: () => void
  loadPublished?: boolean
  story?: StoryType
}

const EditBar: React.FC<iEditBar> = ({ isEditor, isOwner, id, reload, loadPublished, media, story }) => {
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const { actions: dialogActions } = useContext(SimpleDialogContext)
  const { actions: mediaActions } = useContext(ChangeMediaContext)
  const { actions: inviteContributorActions } = useContext(StepInviteContributorContext)
  const history = useHistory()
  const [progress, setProgress] = useState<number>(0)
  const [published, setPublished] = useState<boolean>(loadPublished || false)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)
  const token = Cookies.get('token') as string
  const user: UserType = JSON.parse(Cookies.get('user') || '{}')
  const [showShare, setShowShare] = useState<boolean>(false)

  const canDownload = user.tier > 0 && isOwner

  const canGoToCollection = story!.collections[0]!.watchers.find(e => e.email === user.email) || isOwner

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
    accept: 'image/png, image/jpeg, image/jpg'
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
        currentCollectionId={story!.collections[0]!.id}
        storyId={id}
        reload={reload}
        isMenu
      />
      <MenuItem onClick={() => inviteContributorActions.open(id)}>Request content</MenuItem>
      {isOwner && (
        <>
          {' '}
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
        </>
      )}
      {canDownload && (
        <>
          {' '}
          <MenuItem
            onClick={() => {
              const url = new URL(story!.downloadUrl)
              url.search = new URLSearchParams({ original: 'f', jwt: token }).toString()
              window.location.assign(url)
            }}
          >
            Download optimized
          </MenuItem>
          <MenuItem
            onClick={() => {
              const url = new URL(story!.downloadUrl)
              url.search = new URLSearchParams({ original: 't', jwt: token }).toString()
              window.location.assign(url)
            }}
          >
            Download original
          </MenuItem>{' '}
        </>
      )}
      {isOwner && (
        <MenuItem
          onClick={() => {
            setShowShare(true)
            handleMobileMenuClose()
          }}
        >
          Invite Editor
        </MenuItem>
      )}
      {isOwner && (
        <MenuItem
          onClick={() => {
            handleDelete()
            handleMobileMenuClose()
          }}
        >
          Delete
        </MenuItem>
      )}
    </Menu>
  )
  return (
    <>
      {isOwner && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end'
          }}
        >
          {showShare && (
            <Share
              title="Invite editor"
              id={id}
              assetType={AssetTypes.story}
              type="EDITOR"
              onCloseClick={() => setShowShare(false)}
            />
          )}
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={published} onChange={handlePublished} />}
              label={published ? 'Published' : 'Draft'}
            />
          </FormGroup>
        </Box>
      )}
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
          component={canGoToCollection ? Link : 'div'}
          to={`/a/collections/${story!.collections[0]!.id}?storyId=${id}`}
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {canGoToCollection && <ArrowBackIcon />}
          <Typography sx={{ paddingLeft: 1 }}>{story!.collections[0]!.title}</Typography>
        </Box>
        {isOwner && (
          <Stack direction="row">
            <Box sx={{ display: { xs: 'none', md: 'flex' } }} component="span">
              <Button color="secondary" onClick={() => inviteContributorActions.open(id)} startIcon={<PersonAddIcon />}>
                Request content
              </Button>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }} component="span">
              <CollectionMove currentCollectionId={story!.collections[0]!.id} storyId={id} reload={reload} />
            </Box>
            {isOwner && (
              <Box {...getRootProps()} sx={{ display: { xs: 'none', md: 'flex' } }} component="span">
                <input {...getInputProps()} />
                <PopupState variant="popover" popupId="demo-popup-menu">
                  {popupState => (
                    <React.Fragment>
                      <Button
                        startIcon={<UploadFileIcon />}
                        sx={{ display: { xs: 'none', md: 'flex' } }}
                        color="secondary"
                        {...bindTrigger(popupState)}
                      >
                        Replace
                      </Button>
                      <Menu {...bindMenu(popupState)}>
                        <MenuItem
                          onClick={() => {
                            mediaActions.open(id)
                            popupState.close()
                          }}
                        >
                          Media
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            openUpload()
                            popupState.close()
                          }}
                        >
                          Thumbnail
                        </MenuItem>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
              </Box>
            )}
            {canDownload && (
              <Box sx={{ display: { xs: 'none', md: 'flex' } }} component="span">
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
                            url.search = new URLSearchParams({ original: 't', jwt: token }).toString()
                            window.location.assign(url)
                            popupState.close()
                          }}
                        >
                          Original
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            const url = new URL(story!.downloadUrl)
                            url.search = new URLSearchParams({ original: 'f', jwt: token }).toString()
                            window.location.assign(url)
                            popupState.close()
                          }}
                        >
                          Optimized
                        </MenuItem>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
              </Box>
            )}
            {isOwner && (
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button color="secondary" onClick={() => setShowShare(true)} startIcon={<ShareIcon />}>
                  Invite Editor
                </Button>
              </Box>
            )}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button color="secondary" onClick={handleDelete} startIcon={<DeleteIcon />}>
                Delete
              </Button>
            </Box>
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
    </>
  )
}

export default EditBar
