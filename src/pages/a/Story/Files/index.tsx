import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { SimpleDialogContext } from '../../../../components/SimpleDialog'
import Button from '@mui/material/Button'
import api from '../../../../lib/api'
import { SimpleSnackbarContext } from '../../../../components/SimpleSnackbar'
import { FileType } from '../../../../lib/types'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import CircularProgress from '@mui/material/CircularProgress'
import Link from '@mui/material/Link'

interface iFiles {
  isEditor: boolean
  storyId: string
}

const Files: React.FC<iFiles> = ({ isEditor, storyId }) => {
  const { actions: simpleDialogActions } = useContext(SimpleDialogContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const [files, setFiles] = useState<FileType[]>([])
  const [progress, setProgress] = useState<{ [key: string]: number }>({})

  const fetch = async () => {
    const result = await api.getFiles(0, 10000, [storyId])
    setFiles(result.content)
  }

  useEffect(() => {
    fetch()
  }, [])

  const handleDelete = async (file?: FileType) => {
    if (!file) {
      snackActions.open('Something was wrong! please try again.')
      return
    }
    simpleDialogActions.open(
      'Delete image',
      <>
        <Typography component="span">Are you sure want to delete the file</Typography>
        <Typography fontWeight="700" component="span">{` "${file.originalName}" `}</Typography>
        <Typography component="span">from this story?</Typography>
      </>,
      { okText: 'Yes, delete', showOk: true, cancelText: 'Back' },
      async success => {
        try {
          if (success) {
            await api.deleteFile(file.id)
            setFiles(files.filter(p => p.id !== file.id))
            snackActions.open(`${file.originalName} removed from this story!`)
          }
        } catch (error) {
          // @ts-ignore
          const { data } = error
          if (data.code) {
            snackActions.open(`Error to add ${file.originalName} to this story!`)
            return
          }
          snackActions.open('Something was wrong! please try again.')
        }
      }
    )
  }

  const onDrop: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void =
    async acceptedFiles => {
      for (const file of acceptedFiles) {
        try {
          const uploadedFile = await api.uploadFile(storyId, file, event => {
            setProgress(old => ({ ...old, [file.name]: Math.round((event.loaded * 100) / event.total) }))
          })
          setProgress(old => {
            delete old[file.name]
            return old
          })
          setFiles(value => [uploadedFile, ...value])
        } catch (error) {
          // @ts-ignore
          const { data } = error
          if (data.code === '1024') {
            snackActions.open('User Storage quota exceeded.')
          }
        }
      }
    }

  const { getRootProps, getInputProps, open } = useDropzone({ onDrop, noClick: true })

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
      {isEditor && (
        <>
          <Box>
            <Typography sx={{ marginBottom: 3 }} gutterBottom>
              Add files to enhance your story.
            </Typography>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button variant="outlined" onClick={open} sx={{ mt: 1, mr: 1 }}>
                Upload files
              </Button>
            </div>
            <List>
              {Object.entries(progress).map(([k, v]) => (
                <ListItem key={k}>
                  <ListItemText primary={k} />
                  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress variant="determinate" value={v} />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography variant="caption" component="div" color="text.secondary">
                        {`${Math.round(v || 0)}%`}
                      </Typography>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        </>
      )}

      <Divider sx={{ margin: '24px 0' }} />
      <Box
        sx={{
          marginBottom: 3
        }}
      >
        {files.length ? (
          <Box sx={{ width: '100%', minHeight: 400 }}>
            <List>
              {files.map(file => (
                <ListItem
                  key={file.id}
                  secondaryAction={
                    isEditor && (
                      <IconButton onClick={() => handleDelete(file)} sx={{ color: 'white' }}>
                        <DeleteIcon />
                      </IconButton>
                    )
                  }
                >
                  <ListItemText primary={<Link href={file.url}>{file.originalName}</Link>} />
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <Typography align="center">No files here.</Typography>
        )}
      </Box>
    </Box>
  )
}

export default Files
