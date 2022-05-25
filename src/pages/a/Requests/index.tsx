import React, { useContext, useState } from 'react'
import Grid from '@mui/material/Grid'
import { InviteType } from '../../../lib/types'
import useInfiniteScroll from '../../../components/hooks/useInfiniteScrool'
import { usePageableRequest } from '../../../components/hooks/usePageableRequest'
import RequestItem from '../../../components/RequestItem'
import Typography from '@mui/material/Typography'
import api from '../../../lib/api'
import { RouteComponentProps } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
// @ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { SimpleDialogContext } from '../../../components/SimpleDialog'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import { downloadInvitesSubmissions } from '../../../lib/api/services'

const Requests: React.FC<RouteComponentProps> = () => {
  const { actions: simpleDialogActions } = useContext(SimpleDialogContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const [searchValue, setSearchValue] = useState<string>('')
  const { loading, items, hasNextPage, error, loadMore, setItems } = usePageableRequest<InviteType>({
    size: 15,
    q: '',
    request: api.getInvites
  })

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px'
  })

  const handleDelete = async (id: string) => {
    simpleDialogActions.open(
      'Delete request',
      'Are you sure want to delete this request?',
      { okText: 'Yes, delete', showOk: true, cancelText: 'Back' },
      async success => {
        try {
          if (success) {
            await api.deleteInvite(id)
            snackActions.open(`Request deleted with success!`)
          }
          setItems(items.filter(p => p.id !== id))
        } catch (error) {
          snackActions.open('Something was wrong! please try again.')
        }
      }
    )
  }

  const handleCopy = async (invite: InviteType) => {
    simpleDialogActions.open(
      'Copy request',
      <Box
        sx={{
          minWidth: 350,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexFlow: 'column'
        }}
      >
        <Typography sx={{ mb: 4 }}>Share link:</Typography>
        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${invite.url}`} />
        <Box
          sx={{
            mt: 2
          }}
        >
          <CopyToClipboard text={invite.url} options={{ format: 'text' }}>
            <Button variant="outlined">Copy to clipboard</Button>
          </CopyToClipboard>
        </Box>
      </Box>,
      { cancelText: 'Close', showOk: false }
    )
  }

  return (
    <Grid
      container
      sx={{
        padding: '24px'
      }}
      spacing={4}
    >
      <Grid item xs={12}>
        <Typography variant="h6">Requests</Typography>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <TextField
            key="search"
            name="search"
            sx={{
              minWidth: '422px'
            }}
            rows={4}
            autoComplete="off"
            placeholder="Type request or collection title to filter"
            margin="dense"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          {items
            .filter(
              p =>
                p.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
                p.collectionTitle.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
            )
            .map(invite => (
              <RequestItem key={invite.id} invite={invite}>
                <Button
                  color="secondary"
                  onClick={() => {
                    api.downloadInvitesSubmissions(invite.id)
                  }}
                >
                  Download submissions
                </Button>
                <Button
                  onClick={() => {
                    handleCopy(invite)
                  }}
                  color="secondary"
                >
                  Share
                </Button>
                <Button
                  color="secondary"
                  onClick={() => {
                    handleDelete(invite.id)
                  }}
                >
                  Delete
                </Button>
              </RequestItem>
            ))}
          {hasNextPage && (
            <Grid item xs>
              <div ref={sentryRef} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Requests
