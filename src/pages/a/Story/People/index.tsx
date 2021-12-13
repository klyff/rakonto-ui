import React, { useContext, useState } from 'react'
import { PersonType } from '../../../../lib/types'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import PersonSearch from './PersonSearch/PersonSearch'
import { SimpleDialogContext } from '../../../../components/SimpleDialog'
import Button from '@mui/material/Button'
import CreateEditCollection from './CreateEditPerson'
import api from '../../../../lib/api'
import PersonItem from '../../../../components/PersonItem'
import { SimpleSnackbarContext } from '../../../../components/SimpleSnackbar'

interface iPeople {
  persons: PersonType[]
  canEdit: boolean
  storyId: string
}

const People: React.FC<iPeople> = ({ persons, canEdit, storyId }) => {
  const { actions: simpleDialogActions } = useContext(SimpleDialogContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const [searchValue, setSearchValue] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [personSelectedEdit, setPersonSelectedEdit] = useState<PersonType | undefined>()
  const [people, setPeople] = useState<PersonType[]>(persons)

  const handleSelect = async (person: PersonType) => {
    if (person?.id) {
      try {
        await api.addPersonToStory(storyId, person.id)
        snackActions.open(`${person.name} added to this story!`)
      } catch (error) {
        // @ts-ignore
        const { data } = error
        if (data.code) {
          snackActions.open(`Error to add ${person.name} to this story!`)
          return
        }
        snackActions.open('Something was wrong! please try again.')
      }

      setPeople([...people, person])
    }
  }

  const handleOpen = (value: boolean, person?: PersonType) => {
    setPersonSelectedEdit(value ? person : undefined)
    setIsOpen(value)
  }

  const handleDelete = async (person: PersonType) => {
    simpleDialogActions.open(
      'Delete person',
      <>
        <Typography>Are you sure want to delete</Typography>
        <Typography fontWeight="700" component="span">{` ${person.name} `}</Typography>
        <Typography component="span">from this story?</Typography>
      </>,
      { okText: 'Yes, delete', showOk: true, cancelText: 'Back' },
      async success => {
        try {
          if (success) {
            await api.removePersonFromStory(storyId, person.id)
            snackActions.open(`${person.name} removed from this story!`)
          }
        } catch (error) {
          // @ts-ignore
          const { data } = error
          if (data.code) {
            snackActions.open(`Error to add ${person.name} to this story!`)
            return
          }
          snackActions.open('Something was wrong! please try again.')
        }

        setPeople(people.filter(p => p.id !== person.id))
      }
    )
  }

  const handleCloseDialog = (person?: PersonType) => {
    if (person) {
      if (people.some(p => p.id === person.id)) {
        setPeople(
          people.map(p => {
            if (p.id === person.id) return person
            return p
          })
        )
      } else {
        handleSelect(person)
      }
    }
    setIsOpen(false)
  }

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
      {canEdit && (
        <>
          {isOpen && <CreateEditCollection onClose={handleCloseDialog} selectedPerson={personSelectedEdit} />}
          <Typography sx={{ marginBottom: 3 }} gutterBottom>
            Add people who are interviewed or are mentioned in the story. Users will be able to filter / search for
            stories mentioning specific people. Include links to external websites to learn more.
          </Typography>
          <Box
            sx={{
              maxWidth: '422px'
            }}
          >
            <PersonSearch handleOpen={handleOpen} handleSelect={handleSelect} people={people} />
          </Box>
        </>
      )}

      <Divider sx={{ margin: '24px 0' }} />
      {!canEdit && (
        <Box
          sx={{
            maxWidth: '422px',
            marginBottom: 3
          }}
        >
          <TextField
            size="small"
            key="search"
            name="search"
            fullWidth
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
      )}
      {people.length ? (
        people
          .filter(p => p.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
          .map(person => (
            <PersonItem key={person.id} person={person}>
              <Button
                onClick={() => {
                  handleOpen(true, person)
                }}
                color="secondary"
              >
                Edit
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  handleDelete(person)
                }}
              >
                Delete
              </Button>
            </PersonItem>
          ))
      ) : (
        <Typography align="center">No person added yet</Typography>
      )}
    </Box>
  )
}

export default People
