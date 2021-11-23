import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import LinkIcon from '@mui/icons-material/Link'
import IconButton from '@mui/material/IconButton'
import { AssetTypes, WatcherType } from '../../lib/types'
import api from '../../lib/api'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import { Drawer, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { shareSchema } from './schemas'
import { SimpleSnackbarContext } from '../SimpleSnackbar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import DeleteIcon from '@mui/icons-material/Delete'
import FolderIcon from '@mui/icons-material/Folder'
import Avatar from '@mui/material/Avatar'
import LoadingButton from '@mui/lab/LoadingButton'
import WatcherActionMenu from './WatcherActionMenu'

interface iShare {
  id?: string
  type?: AssetTypes
  published?: boolean
  onCloseClick: () => void
}

const Share: React.FC<iShare> = ({ id, type, onCloseClick }) => {
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const [watchers, setWatchers] = useState<WatcherType[]>([])
  const [published, setPublished] = useState<boolean>(false)

  const fetchWatchers = async () => {
    if (!id || !type) return
    setWatchers(await api.getWatchers(id, type))
  }

  const fetchIsPublished = async () => {
    if (!id || !type) return
    setPublished(await api.isPublished(id, type))
  }

  useEffect(() => {
    fetchWatchers()
    fetchIsPublished()
  }, [id, type])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    snackActions.open('Link copied to clipboard!')
  }

  const onSubmit = async ({ email }: { email: string }) => {
    try {
      if (!id || !type) return
      await api.addWatcher({ email, id }, type)
      snackActions.open(`${email} added to watch this ${type}`)
      fetchWatchers()
    } catch (error) {
      snackActions.open(`Problem to add ${email} to watch this ${type}`)
    }
  }

  const { isSubmitting, values, handleBlur, handleChange, touched, errors, handleSubmit, resetForm } = useFormik({
    initialValues: { email: '' },
    validationSchema: shareSchema,
    onSubmit
  })

  const handlePublished = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!id || !type) return
      await api.publish(id, event.target.checked, type)
    } catch (error) {
      snackActions.open(`Problem to make this ${type} ${event.target.checked ? 'private' : 'public'}`)
    }
  }

  const removeWatcher = async (watcherId: string) => {
    const watcher = watchers.find(w => watcherId === w.id) as WatcherType
    try {
      if (!type) return
      await api.removeWatcher(watcherId, type)
      fetchWatchers()
      snackActions.open(`${watcher.email} added to watch this ${type}`)
    } catch (error) {
      snackActions.open(`Problem to remove ${watcher.email} from this ${type}`)
    }
  }

  const notifyWatcher = async (watcherId: string) => {
    const watcher = watchers.find(w => watcherId === w.id) as WatcherType
    try {
      if (!type) return
      await api.notifyWatcher(watcherId, type)
      snackActions.open(`${watcher.email} notified to watch this ${type}`)
    } catch (error) {
      snackActions.open(`Problem to notify ${watcher.email}`)
    }
  }

  return (
    <Drawer anchor="right" open>
      <Box
        component={Paper}
        sx={{
          width: '472px',
          height: '100%'
        }}
      >
        <Box
          sx={{
            padding: 3,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{
              flex: 1
            }}
          >
            Share
          </Typography>
          <IconButton onClick={onCloseClick}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box
          sx={{
            padding: 3
          }}
        >
          <Button color="secondary" startIcon={<LinkIcon />} onClick={copyToClipboard}>
            Copy link
          </Button>
        </Box>
        <Box
          sx={{
            backgroundColor: 'grey.400',
            padding: 3,
            color: 'common.black'
          }}
        >
          <Typography>Choose who will be able to view your {type}</Typography>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={published} onChange={handlePublished} defaultChecked />}
              label={published ? 'Public for everyone see it' : 'Private'}
            />
          </FormGroup>
        </Box>
        <Box
          sx={{
            padding: '24px 24px 0px',
            display: 'flex',
            flexFlow: 'column',
            flex: '1'
          }}
        >
          <Typography gutterBottom>Invite people to see your {type}</Typography>
          <form>
            <TextField
              margin="normal"
              name="email"
              fullWidth
              placeholder="Email address"
              label="Email address"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={(touched.email && errors.email) || ' '}
            />
            <LoadingButton
              loading={isSubmitting}
              onClick={() => {
                handleSubmit()
              }}
              fullWidth
              variant="contained"
            >
              Invite
            </LoadingButton>
          </form>
          <Box>
            <List>
              {watchers.map(watcher => (
                <ListItem
                  key={watcher.id}
                  secondaryAction={
                    <WatcherActionMenu id={watcher.id} deleteWatcher={removeWatcher} notifyWatcher={notifyWatcher} />
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={watcher.email} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </Drawer>
  )
}

export default Share
