import React from 'react'
import { LinkType } from '@root/types'
import { Header as SHeader } from 'semantic-ui-react'
import LinksList from './LinksList'

interface iLinks {
  links: LinkType[]
}

const Links: React.FC<iLinks> = ({ links }) => {
  return (
    <>
      <SHeader as="h1">List of links</SHeader>
      <LinksList links={links} />
    </>
  )
}

export default Links
