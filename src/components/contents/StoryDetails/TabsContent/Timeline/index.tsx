import React, { useState } from 'react'
import LoadingArea from '@root/components/suport/LoadingArea'
import { ColumnForm, ColumnPreview, Header, Layout } from '../style'
import { TimelineType } from '@root/types'
import { useTimelineApi } from './useTimelineApi'
import AddEditTimelineFormModal from '@root/components/modals/AddEditTimelineFormModal'
import Ocurrencies from './Ocurrencies'
import { AddButton } from './style'
import { useSetRecoilState } from 'recoil'
import { basicModalState } from '@root/components/modals/BasicModal'

interface iTimeline {
  isLoading: boolean
  storyId: string
  refresh: () => void
  ocurrencies: TimelineType[]
}

const Timeline: React.FC<iTimeline> = ({ isLoading, refresh, storyId, ocurrencies, children }) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { addOccurrence, removeOccurrence } = useTimelineApi()
  const setBasicModalState = useSetRecoilState(basicModalState)

  const addEditTimeline = (timeline?: TimelineType) => {
    setOpenModal(true)
  }

  const HandleRemove = async (timeline: TimelineType) => {
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
          Do you want remove <b>{timeline.title}</b> from this story?
        </>
      )
    })
  }

  return (
    <Layout>
      <LoadingArea isLoading={isLoading}>
        <ColumnForm>
          <Header>
            Add important events mentioned in the story, and enable people to view these events on a timeline
          </Header>
          <AddButton primary onClick={() => addEditTimeline()}>
            Add new event
          </AddButton>
          <Ocurrencies ocurrencies={ocurrencies} removeOcurrence={HandleRemove} />
        </ColumnForm>
        <ColumnPreview>{children}</ColumnPreview>
        <AddEditTimelineFormModal
          timeline={null}
          open={openModal}
          onClose={async ocurrency => {
            if (ocurrency && !ocurrency.id) {
              await addOccurrence({
                storyId: storyId,
                at: ocurrency.at,
                description: ocurrency.description,
                title: ocurrency.title
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

export default Timeline
