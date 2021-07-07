import React, { useState } from 'react'
import LoadingArea from '@root/components/suport/LoadingArea'
import { ColumnForm, ColumnPreview, Layout } from '@root/components/contents/StoryDetails/TabsContent/style'
import { TimelineType } from '@root/types'
import { TimelineItemModel } from 'react-chrono/dist/models/TimelineItemModel'
import { useTimelineApi } from './useTimelineApi'
import AddEditTimelineFormModal from '@root/components/modals/AddEditTimelineFormModal'
import Ocurrencies from './Ocurrencies'
import { AddButton, OcurrenciesArea } from './style'

interface iTimeline {
  isLoading: boolean
  storyId: string
  refresh: () => void
  ocurrencies: TimelineType[]
}

const Timeline: React.FC<iTimeline> = ({ isLoading, refresh, storyId, ocurrencies, children }) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { addOccurency, removeOccurency } = useTimelineApi()

  const items: TimelineItemModel[] = ocurrencies.map(
    (ocurrency): TimelineItemModel => ({
      id: ocurrency.id,
      title: ocurrency.at.toString(),
      cardSubtitle: ocurrency.title,
      cardDetailedText: ocurrency.description
    })
  )

  const addEditTimeline = (timeline?: TimelineType) => {
    setOpenModal(true)
  }

  return (
    <Layout>
      <LoadingArea isLoading={isLoading}>
        <ColumnForm>
          <AddButton primary onClick={() => addEditTimeline()}>
            Add new ocurrency
          </AddButton>
          <OcurrenciesArea>
            <Ocurrencies ocurrencies={ocurrencies} />
          </OcurrenciesArea>
        </ColumnForm>
        <ColumnPreview>{children}</ColumnPreview>
        <AddEditTimelineFormModal
          timeline={null}
          open={openModal}
          onClose={async ocurrency => {
            if (ocurrency && !ocurrency.id) {
              await addOccurency({
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
