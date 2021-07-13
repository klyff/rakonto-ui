import React, { useState } from 'react'
import LoadingArea from '@root/components/suport/LoadingArea'
import { ColumnForm, ColumnPreview, Layout } from '@root/components/contents/StoryDetails/TabsContent/style'
import { PlaceType } from '@root/types'
import { usePlacesApi } from './usePlacesApi'
import AddEditPlaceFormModal from '@root/components/modals/AddEditPlaceFormModal'
import PlacesList from './PlacesList'
import { AddButton, OcurrenciesArea } from './style'
import { useSetRecoilState } from 'recoil'
import { basicModalState } from '@root/components/modals/BasicModal'

interface iTimeline {
  isLoading: boolean
  storyId: string
  refresh: () => void
  places: PlaceType[]
}

const Places: React.FC<iTimeline> = ({ isLoading, refresh, storyId, places, children }) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { addPlace, removePlace } = usePlacesApi()
  const setBasicModalState = useSetRecoilState(basicModalState)

  const addEditPlace = (place?: PlaceType) => {
    setOpenModal(true)
  }

  const HandleRemove = async (place: PlaceType) => {
    setBasicModalState({
      open: true,
      title: 'Remove place',
      isConfirmation: true,
      onClose: async isSuccess => {
        if (!isSuccess) return
        await removePlace(place.id)
        await refresh()
      },
      content: (
        <>
          Do you want remove <b>{place.name}</b> from this story?
        </>
      )
    })
  }

  return (
    <Layout>
      <LoadingArea isLoading={isLoading}>
        <ColumnForm>
          <AddButton primary onClick={() => addEditPlace()}>
            Add new place
          </AddButton>
          <OcurrenciesArea>
            <PlacesList places={places} removeOcurrence={HandleRemove} />
          </OcurrenciesArea>
        </ColumnForm>
        <ColumnPreview>{children}</ColumnPreview>
        <AddEditPlaceFormModal
          place={null}
          open={openModal}
          onClose={async place => {
            if (place) {
              const { description, longitude, latitude, location, name } = place
              await addPlace({
                storyId,
                description,
                longitude,
                latitude,
                location,
                name
              })
            }
            setOpenModal(false)
            refresh()
          }}
        />
      </LoadingArea>
    </Layout>
  )
}

export default Places
