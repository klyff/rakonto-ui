import React, { useContext, useState } from 'react'
import Grid from '@mui/material/Grid'
import { TeamMemberType } from '../../../lib/types'
import useInfiniteScroll from '../../../components/hooks/useInfiniteScrool'
import { usePageableRequest } from '../../../components/hooks/usePageableRequest'
import Typography from '@mui/material/Typography'
import api from '../../../lib/api'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import TeamMemberItem from '../../../components/TeamMemberItem'
import DeleteIcon from '@mui/icons-material/Delete'
import { FormDialogContext } from '../../../components/FormDialog'
import { SimpleDialogContext } from '../../../components/SimpleDialog'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import { emailSchema } from './schemas'

const TeamMembers: React.FC = () => {
  const { actions: formDialogActions } = useContext(FormDialogContext)
  const { actions: simpleDialogActions } = useContext(SimpleDialogContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const [searchValue, setSearchValue] = useState<string>('')

  const { loading, items, hasNextPage, error, loadMore, setItems } = usePageableRequest<TeamMemberType>({
    size: 15,
    q: '',
    request: api.getTeamMembers
  })

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px'
  })

  const addMember = () => {
    formDialogActions.open(
      'Add user',
      'Type email from user that you add to your team',
      [
        {
          label: 'Email',
          name: 'email',
          placeholder: 'Type email',
          type: 'text'
        }
      ],
      { email: '' },
      emailSchema,
      async ({ email }: { email: string }) => {
        try {
          const newMember = await api.addTeamMember(email)
          setItems([...items, newMember])
          snackActions.open('User add with success!')
        } catch (error) {
          snackActions.open('This user cannot be added to your team.')
        }
      },
      { okText: 'Add user', cancelText: `cancel` }
    )
  }

  const removeMember = async (id: string) => {
    simpleDialogActions.open(
      'Remove member',
      "Are you sure? This member will be removed and can't access your account.",
      { okText: 'Yes, remove', showOk: true, cancelText: 'cancel' },
      async success => {
        if (success) {
          try {
            await api.deleteTeamMember(id)
            setItems(items.filter(item => item.id !== id))
            snackActions.open('Member removed with success.')
          } catch (error) {
            snackActions.open('Error when trying to remove the member.')
          }
        }
      }
    )
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100%', bgcolor: 'background.paper', padding: 2 }}>
      <Grid container spacing={1}>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: { xs: 'space-between', md: 'start' }, alignItems: 'center' }}
        >
          <Typography sx={{ mr: 2 }} variant="h6">
            TeamMembers
          </Typography>
          <IconButton onClick={addMember} size="large">
            <GroupAddIcon />
          </IconButton>
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
              fullWidth
              sx={{
                maxWidth: '422px'
              }}
              autoComplete="off"
              placeholder="Type member name for filter list"
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
              .filter(member => member.user.email.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
              .map(member => (
                <TeamMemberItem key={member.id} member={member}>
                  <IconButton onClick={() => removeMember(member.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TeamMemberItem>
              ))}
            {hasNextPage && (
              <Grid item xs>
                <div ref={sentryRef} />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TeamMembers
