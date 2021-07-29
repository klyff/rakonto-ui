import React from 'react'
import { FileType } from '@root/types'
import { Header as SHeader } from 'semantic-ui-react'
import FilesList from './FilesList'

interface iFiles {
  files: FileType[]
}

const Files: React.FC<iFiles> = ({ files }) => {
  return (
    <>
      <SHeader as="h1">List of files</SHeader>
      <FilesList files={files} />
    </>
  )
}

export default Files
