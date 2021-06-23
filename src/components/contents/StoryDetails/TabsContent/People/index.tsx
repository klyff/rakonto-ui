import React, { useState } from 'react'
import { Layout, ColumnForm, ColumnPreview } from '../style'
import { SearchButton } from './style'
import { PersonType } from '@root/types'
import { Divider, Header } from 'semantic-ui-react'
import { useSetRecoilState } from 'recoil'
import { usePeopleApi } from './usePeopleApi'
import Peoples from './Peoples'
import Search from './Search'
import { SearchResultData } from 'semantic-ui-react/dist/commonjs/modules/Search/Search'
import debounce from 'lodash.debounce'
import LoadingArea from '@root/components/suport/LoadingArea'
import { basicModalState } from '@root/components/modals/BasicModal'
import AddEditPersonFormModal from '@root/components/modals/AddEditPersonFormModal'

interface iPeople {
  persons?: PersonType[]
  storyId: string
  refresh: () => void
  isLoading: boolean
}

const People: React.FC<iPeople> = ({ storyId, children, isLoading, refresh, persons = [] }) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [editPerson, setEditPerson] = useState<PersonType | null>(null)
  const setBasicModalState = useSetRecoilState(basicModalState)
  const { personList, loadingPeopleList, addPerson, getPersonList, clearPersonList, removePerson } = usePeopleApi()

  const handleSearchChange = ({ value }: SearchResultData) => {
    getPersonList(value || '')
  }

  const handleSearchSelected = async ({ result }: SearchResultData) => {
    await addPerson(storyId, result.id)
    setBasicModalState({
      open: true,
      title: 'Add person',
      content: <>{result.name} was added to this story.</>
    })
    clearPersonList()
    await refresh()
  }

  const HandleRemove = async (person: PersonType) => {
    setBasicModalState({
      open: true,
      title: 'Remove person',
      isConfirmation: true,
      onClose: async isSuccess => {
        if (!isSuccess) return
        await removePerson(storyId, person.id)
        setBasicModalState({
          open: true,
          title: 'Remove person',
          content: (
            <>
              <b>{person.name}</b> was removed from this story.
            </>
          )
        })
        await refresh()
      },
      content: (
        <>
          Do you want remove <b>{person.name}</b> from this story?
        </>
      )
    })
  }

  const addEditPerson = (person?: PersonType) => {
    setOpenModal(true)
    setEditPerson(person || null)
  }

  return (
    <Layout>
      <LoadingArea isLoading={isLoading}>
        <ColumnForm>
          <SearchButton type="submit" primary id="save" onClick={() => addEditPerson()}>
            Add a new person
          </SearchButton>
          <Search
            personList={personList}
            loading={loadingPeopleList}
            onChange={debounce(handleSearchChange, 500)}
            onSelected={handleSearchSelected}
          />
          <Divider />
          <Header as="h1">List of people</Header>
          <Peoples persons={persons} removePerson={HandleRemove} editPerson={addEditPerson} />
        </ColumnForm>
        <ColumnPreview>{children}</ColumnPreview>
      </LoadingArea>
      <AddEditPersonFormModal
        isEdit={false}
        open={openModal}
        person={editPerson}
        onClose={async person => {
          if (person) {
            await addPerson(storyId, person.id)
          }
          setOpenModal(false)
          setEditPerson(null)
          refresh()
        }}
      />
    </Layout>
  )
}

export default People
