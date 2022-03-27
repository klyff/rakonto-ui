import React, { useContext, useState } from 'react'
import Share from '../../../components/Share'
import { AssetTypes, CollectionType, ImageType } from '../../../lib/types'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton'
import ImageIcon from '@mui/icons-material/Image'
import Button from '@mui/material/Button'
import ShareIcon from '@mui/icons-material/Share'
import DeleteIcon from '@mui/icons-material/Delete'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'
import api from '../../../lib/api'
import Typography from '@mui/material/Typography'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import { SimpleDialogContext } from '../../../components/SimpleDialog'
import { useHistory } from 'react-router-dom'
import { Menu, MenuItem } from '@mui/material'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import DownloadIcon from '@mui/icons-material/Download'
import Cookies from 'js-cookie'

interface iEditBar {
  canEdit: boolean
  id: string
  onChange?: (image: ImageType) => void
  collection?: CollectionType
}

const EditBar: React.FC<iEditBar> = ({ canEdit, id, onChange, collection }) => {
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const { actions: dialogActions } = useContext(SimpleDialogContext)
  const history = useHistory()
  const [progress, setProgress] = useState<number>(0)
  const [showShare, setShowShare] = useState<boolean>(false)
  const token = Cookies.get('token') as string

  const onDrop: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void =
    async acceptedFiles => {
      try {
        const selectedFile = acceptedFiles[0]
        const image = await api.uploadImage(selectedFile, event => {
          setProgress(Math.round((event.loaded * 100) / event.total))
        })
        setProgress(0)
        onChange && onChange(image)
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
        <Typography fontWeight="700">Are you sure you want to delete this collection?</Typography>
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
            await api.deleteCollection(id)
            history.push('/a/my-library')
          } catch (error) {
            snackActions.open(
              <>
                You cannot delete this collection because it has stories linked to it.
                <br />
                If you wish to delete this collection you first must remove all stories from it.
              </>
            )
          }
        }
      }
    )
  }

  if (!canEdit) return null
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
      {showShare && (
        <Share
          id={id}
          title="Share"
          assetType={AssetTypes.collection}
          type="VIEWER"
          onCloseClick={() => setShowShare(false)}
        />
      )}
      <Stack direction="row" {...getRootProps()}>
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
        <PopupState variant="popover">
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
                    const url = new URL(collection!.downloadUrl)
                    url.search = new URLSearchParams({ original: 't', jwt: token }).toString()
                    window.location.assign(url)
                    popupState.close()
                  }}
                >
                  Original
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    const url = new URL(collection!.downloadUrl)
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
        <Button color="secondary" onClick={() => setShowShare(true)} startIcon={<ShareIcon />}>
          Share
        </Button>
        <Button color="secondary" onClick={handleDelete} startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </Stack>
    </Box>
  )
}

export default EditBar
