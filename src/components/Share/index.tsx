import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import LinkIcon from '@mui/icons-material/Link'
import IconButton from '@mui/material/IconButton'
import { AssetTypes, Watcher, WatcherType } from '../../lib/types'
import api from '../../lib/api'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import { Drawer, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { SimpleSnackbarContext } from '../SimpleSnackbar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import LoadingButton from '@mui/lab/LoadingButton'
import WatcherActionMenu from './WatcherActionMenu'
import schema from './schema'

interface iShare {
  id?: string
  assetType?: AssetTypes
  published?: boolean
  onCloseClick: () => void
  type: WatcherType
  title: string
}

const Share: React.FC<iShare> = ({ title, id, assetType, onCloseClick, type }) => {
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const [watchers, setWatchers] = useState<Watcher[]>([])
  const [published, setPublished] = useState<boolean>(false)

  const fetchWatchers = async () => {
    if (!id || !assetType) return
    const watchers = await api.getWatchers(id, assetType)
    setWatchers(watchers.content)
  }

  const fetchIsPublished = async () => {
    if (!id || !assetType) return
    setPublished(await api.isPublished(id, assetType))
  }

  useEffect(() => {
    fetchWatchers()
    fetchIsPublished()
  }, [id, assetType])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    snackActions.open('Link copied to clipboard!')
  }

  const onSubmit = async ({ email }: { email: string }) => {
    try {
      if (!id || !assetType) return
      await api.addWatcher({ email, id, type }, assetType)
      snackActions.open(`${email} added to watch this ${assetType}`)
      fetchWatchers()
    } catch (error) {
      snackActions.open(`Problem to add ${email} to watch this ${assetType}`)
    }
  }

  const { isSubmitting, values, handleBlur, handleChange, touched, errors, handleSubmit, resetForm, setFieldValue } =
    useFormik({
      initialValues: { email: '' },
      validationSchema: schema,
      onSubmit
    })

  const handlePublished = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!id || !assetType) return
      await api.publish(id, event.target.checked, assetType)
      fetchIsPublished()
    } catch (error) {
      snackActions.open(`Problem to make this ${assetType} ${event.target.checked ? 'private' : 'public'}`)
    }
  }

  const removeWatcher = async (watcherId: string) => {
    const watcher = watchers.find(w => watcherId === w.id) as Watcher
    try {
      if (!assetType) return
      await api.removeWatcher(watcherId, assetType)
      fetchWatchers()
      snackActions.open(`${watcher.email} removed to watch this ${assetType}`)
    } catch (error) {
      snackActions.open(`Problem to remove ${watcher.email} from this ${assetType}`)
    }
  }

  const notifyWatcher = async (watcherId: string) => {
    const watcher = watchers.find(w => watcherId === w.id) as Watcher
    try {
      if (!assetType) return
      await api.notifyWatcher(watcherId, assetType)
      snackActions.open(`${watcher.email} notified to watch this ${assetType}`)
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
            {title}
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
        {type === 'VIEWER' && (
          <Box
            sx={{
              backgroundColor: 'grey.400',
              padding: 3,
              color: 'common.black'
            }}
          >
            <Typography>Choose who will be able to view your {assetType}</Typography>
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={published} onChange={handlePublished} />}
                label={published ? 'Anyone can view this collection' : 'Private'}
              />
            </FormGroup>
          </Box>
        )}
        <Box
          sx={{
            padding: '24px 24px 0px',
            display: 'flex',
            flexFlow: 'column',
            flex: '1'
          }}
        >
          <Typography gutterBottom>
            Invite people to {type === 'VIEWER' ? 'see' : 'edit'} your {assetType}
          </Typography>
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
