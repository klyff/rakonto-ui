import React from 'react'
import { PersonType } from '@root/types'
import { Header } from 'semantic-ui-react'
import Peoples from './Peoples'

interface iPeople {
  persons?: PersonType[]
}

const People: React.FC<iPeople> = ({ persons = [] }) => {
  return (
    <>
      <Header as="h1">List of people</Header>
      <Peoples persons={persons} />
    </>
  )
}

export default People
