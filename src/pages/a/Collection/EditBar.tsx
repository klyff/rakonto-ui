import React, { useContext, useState } from 'react'
import Share from '../../../components/Share'
import { AssetTypes, ImageType } from '../../../lib/types'
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

interface iEditBar {
  canEdit: boolean
  id: string
  onChange?: (image: ImageType) => void
}

const EditBar: React.FC<iEditBar> = ({ canEdit, id, onChange }) => {
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const { actions: dialogActions } = useContext(SimpleDialogContext)
  const history = useHistory()
  const [progress, setProgress] = useState<number>(0)
  const [showShare, setShowShare] = useState<boolean>(false)
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
        <Typography fontWeight="700">Definitely delete this collection?</Typography>
        <Typography>This action cannot be undone after that.</Typography>
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

  return (
    <>
      {canEdit && (
        <>
          {showShare && <Share id={id} type={AssetTypes.collection} onCloseClick={() => setShowShare(false)} />}
          <Box
            sx={{
              width: '100%',
              padding: '0 24px'
            }}
            component={Paper}
          >
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
              <Button color="secondary" onClick={() => setShowShare(true)} startIcon={<ShareIcon />}>
                Share
              </Button>
              <Button color="secondary" onClick={handleDelete} startIcon={<DeleteIcon />}>
                Delete
              </Button>
            </Stack>
          </Box>
        </>
      )}
    </>
  )
}

export default EditBar
