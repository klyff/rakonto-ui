import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import { PersonType } from '../../../lib/types'
import useInfiniteScroll from '../../../components/hooks/useInfiniteScrool'
import { usePageableRequest } from '../../../components/hooks/usePageableRequest'
import Card from '../../../components/Card'
import Typography from '@mui/material/Typography'
import api from '../../../lib/api'
import { RouteComponentProps } from 'react-router-dom'
import PersonItem from '../../../components/PersonItem'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'

const People: React.FC<RouteComponentProps> = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const { loading, items, hasNextPage, error, loadMore } = usePageableRequest<PersonType>({
    size: 15,
    q: '',
    request: api.getPersons
  })

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px'
  })

  return (
    <Grid
      container
      sx={{
        padding: '24px'
      }}
      spacing={4}
    >
      <Grid item xs={12}>
        <Typography variant="h6">People</Typography>
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
            placeholder="Type person name for filter list"
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
            .filter(p => p.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
            .map(person => (
              <PersonItem key={person.id} person={person} />
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

export default People
