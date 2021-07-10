import React, { useState } from 'react'
import LoadingArea from '@root/components/suport/LoadingArea'
import { ColumnForm, ColumnPreview, Layout } from '@root/components/contents/StoryDetails/TabsContent/style'
import { PlaceType } from '@root/types'
import { useTimelineApi } from './useTimelineApi'
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
  const { addOccurrence, removeOccurrence } = useTimelineApi()
  const setBasicModalState = useSetRecoilState(basicModalState)

  const addEditTimeline = (timeline?: PlaceType) => {
    setOpenModal(true)
  }

  const HandleRemove = async (timeline: PlaceType) => {
    setBasicModalState({
      open: true,
      title: 'Remove ocurrence',
      isConfirmation: true,
      onClose: async isSuccess => {
        if (!isSuccess) return
        await removeOccurrence(timeline.id)
        await refresh()
      },
      content: (
        <>
          Do you want remove <b>{timeline.name}</b> from this story?
        </>
      )
    })
  }

  return (
    <Layout>
      <LoadingArea isLoading={isLoading}>
        <ColumnForm>
          <AddButton primary onClick={() => addEditTimeline()}>
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
            console.log(place)
            setOpenModal(false)
            refresh()
          }}
        />
      </LoadingArea>
    </Layout>
  )
}

export default Places
