import React, { useState } from 'react'
import { StoryType } from '../../../lib/types'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Peoples from './Peoples'
import Timelines from './Timelines'

interface iTabsArea {
  story: StoryType
}

const TabsArea: React.FC<iTabsArea> = ({ story }) => {
  const [tab, setTab] = useState<string>('')
  const {
    owner,
    title,
    description,
    collections,
    comments,
    persons,
    files,
    links,
    transcription,
    galleryEntries,
    timelineEntries,
    places,
    watchers
  } = story

  const onTabClick = (tab = '') => {
    setTab(tab)
  }

  return (
    <TabContext value={(tab as string) || 'peoples'}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList variant="scrollable">
          <Tab label="Peoples" value="peoples" onClick={() => onTabClick('peoples')} />
          <Tab label="Timelines" value="timelines" onClick={() => onTabClick('timelines')} />
          <Tab label="Places" value="places" onClick={() => onTabClick('places')} />
          <Tab label="Photos" value="photos" onClick={() => onTabClick('photos')} />
          <Tab label="Files" value="files" onClick={() => onTabClick('files')} />
          <Tab label="Links" value="links" onClick={() => onTabClick('links')} />
        </TabList>
      </Box>
      <TabPanel value="peoples">
        <Peoples persons={persons} />
      </TabPanel>
      <TabPanel value="timelines">
        <Timelines timelines={timelineEntries} />
      </TabPanel>
      <TabPanel value="places">places</TabPanel>
      <TabPanel value="photos">photos</TabPanel>
      <TabPanel value="files">files</TabPanel>
      <TabPanel value="links">links</TabPanel>
    </TabContext>
  )
}

export default TabsArea
