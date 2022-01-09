import React, { useState, useEffect } from 'react'
import { PersonType, StoryType } from '../../../lib/types'
import Typography from '@mui/material/Typography'
import PersonItem from '../../../components/PersonItem'

interface iPeople {
  list: Array<StoryType>
}

const People: React.FC<iPeople> = ({ list }) => {
  const [persons, setPersons] = useState<PersonType[]>([])
  const [personStories, setPersonStories] = useState<{ [key: string]: { [key: string]: string } }>({})

  useEffect(() => {
    list.forEach(({ id, title, persons }) => {
      persons.forEach(person => {
        const personId = person.id
        setPersonStories(old => {
          old[personId] = { ...old[personId], [id]: title }
          return old
        })
        setPersons(old => {
          if (old.some(x => x.id === person.id)) return old
          return [...old, person]
        })
      })
    })
  }, [])

  return (
    <>
      {persons.length ? (
        persons.map(person => <PersonItem key={person.id} person={person} storyList={personStories[person.id]} />)
      ) : (
        <Typography align="center">No person added yet</Typography>
      )}
    </>
  )
}

export default People
