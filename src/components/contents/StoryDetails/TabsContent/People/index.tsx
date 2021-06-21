import React, { useState } from 'react'
import { Layout, ColumnForm, ColumnPreview } from '../style'
import { PersonType } from '@root/types'
import { Button, Divider, Header } from 'semantic-ui-react'
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
  const [editPerson, setEditPerson] = useState<{ name: string; link: string; id?: string; picture: string }>({
    name: '',
    link: '',
    picture: ''
  })
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
    setEditPerson({
      name: person?.name || '',
      picture: person?.picture?.id || '',
      link: person?.description || '',
      id: person?.id || ''
    })
  }

  return (
    <Layout>
      <LoadingArea isLoading={isLoading}>
        <ColumnForm>
          <Button type="submit" primary id="save" onClick={() => addEditPerson()}>
            Add new person
          </Button>
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
        onClose={() => {
          setOpenModal(false)
          setEditPerson({
            name: '',
            link: '',
            picture: ''
          })
        }}
      />
    </Layout>
  )
}

export default People
