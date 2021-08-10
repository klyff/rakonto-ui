import React, { useState } from 'react'
import { Layout, ColumnForm, ColumnPreview, Header as HeaderTitle } from '../style'
import { AddButton } from './style'
import { api } from '@root/api'
import { LinkType } from '@root/types'
import { Divider, Header as SHeader } from 'semantic-ui-react'
import LinksList from './LinksList'
import LoadingArea from '@root/components/suport/LoadingArea'
import { useSetRecoilState } from 'recoil'
import { basicModalState } from '@root/components/modals/BasicModal'
import AddEditLinkFormModal from '@root/components/modals/AddEditLinkFormModal'

interface iLinks {
  links: LinkType[]
  storyId: string
  refresh: () => void
  isLoading: boolean
}

const Links: React.FC<iLinks> = ({ storyId, refresh, links, isLoading, children }) => {
  const setBasicModalState = useSetRecoilState(basicModalState)
  const [openModal, setOpenModal] = useState<boolean>(false)

  const onRemove = async (value: LinkType) => {
    setBasicModalState({
      open: true,
      title: 'Remove link',
      isConfirmation: true,
      onClose: async (isSuccess: boolean) => {
        if (!isSuccess) return
        await api.deleteLink(value.id)
        refresh()
      },
      content: (
        <>
          Do you want remove link <b>{value.url}</b> from this story?
        </>
      )
    })
  }

  const handleSelected = async () => {
    refresh()
  }

  return (
    <Layout>
      <LoadingArea isLoading={isLoading}>
        <ColumnForm>
          <HeaderTitle></HeaderTitle>
          <AddButton primary id="save" onClick={() => setOpenModal(true)}>
            Add a new link
          </AddButton>
          <Divider />
          <SHeader as="h1">List of links</SHeader>
          <LinksList links={links} onRemove={onRemove} />
        </ColumnForm>
        <ColumnPreview>{children}</ColumnPreview>
      </LoadingArea>
      <AddEditLinkFormModal
        storyId={storyId}
        open={openModal}
        onClose={async reload => {
          setOpenModal(false)
          if (reload) refresh()
        }}
      />
    </Layout>
  )
}

export default Links
