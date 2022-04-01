import React, { useState, useEffect } from 'react'
import { InviteContributorType } from '../../../../lib/types'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useField } from 'formik'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import List from '@mui/material/List'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'

const Step2: React.FC<{ invite: InviteContributorType }> = ({ invite }) => {
  const [{ value: files }, , { setValue }] = useField<File[] | null>('files')
  const [localFiles, setLocalFiles] = useState<File[]>([])

  const onDrop: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void =
    async acceptedFiles => {
      setLocalFiles(acceptedFiles)
    }

  const options = { onDrop, noClick: true, multiple: true }
  if (invite.requestedMediaType === 'GALLERY_ENTRY') {
    // @ts-ignore
    options.accept = 'image/*'
  }
  const { getRootProps, getInputProps, open } = useDropzone(options)

  useEffect(() => {
    if (files?.length) {
      setValue([...files, ...localFiles])
      return
    }
    setValue(localFiles)
  }, [localFiles])

  const remove = (i: number) => {
    const removeFiles = files
    removeFiles!.splice(i, 1)
    setValue(removeFiles)
  }

  let mediaType = null
  if (invite.requestedMediaType) {
    mediaType = invite.requestedMediaType === 'GALLERY_ENTRY' ? 'image' : invite.requestedMediaType?.toLowerCase()
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" mb={2}>
          {`${invite.user.firstName} ${invite.user.lastName} would like you to contribute with ${
            mediaType || 'file or image'
          }.`}
        </Typography>
        <Typography variant="h6">When you are ready, drop or select your files.</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        mt={4}
        mb={9}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
        }}
        position="relative"
      >
        <Box
          sx={{
            width: { xs: '100%', md: 1280 },
            minHeight: 522,
            border: '1px dashed #7b7b7c',
            borderRadius: '20px'
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%'
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {files?.length ? (
              <>
                <Box sx={{ position: 'absolute', right: 0, top: '-70px' }}>
                  <Button size="large" onClick={open} variant="outlined">
                    Add
                  </Button>
                </Box>
                <List>
                  {files.map((f, i) => (
                    <ListItem key={i}>
                      <ListItemText primary={f.name} />
                      <ListItemSecondaryAction>
                        <IconButton onClick={() => remove(i)} edge="end">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </>
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexFlow: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '0px 85px'
                }}
              >
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: 50,
                    backgroundColor: 'primary.main',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 2
                  }}
                >
                  <FileUploadIcon
                    sx={{
                      fontSize: 52,
                      color: 'common.black'
                    }}
                  />
                </Box>
                <Typography fontWeight="700" align="center" variant="h6" gutterBottom>
                  {`Drag and drop here`}
                </Typography>
                <Typography fontWeight="700" align="center" variant="h6" gutterBottom>
                  or
                </Typography>
                <Button size="large" onClick={open} variant="outlined">
                  Choose file
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Step2
