import React, { useEffect, useState } from 'react'
import { markerType, StoryType } from '../../../lib/types'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import MapViewer from '../../../components/MapViewer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'

interface iPlace {
  list: StoryType[]
}

const Places: React.FC<iPlace> = ({ list }) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [openMarker, setOpenMarker] = useState<string | undefined>(undefined)
  const [markers, setMarkers] = useState<markerType[]>([])
  const [storyPlacesList, setStoryPlacesList] = useState<
    { storyId: string; storyTitle: string; markers: markerType[] }[]
  >([])

  useEffect(() => {
    list.forEach(story => {
      const storyTitle = story.title
      const storyId = story.id
      const computedMarkers = story.places.map<markerType>(place => ({
        id: place.id,
        title: place.name,
        content: (
          <>
            {place.name}
            <br />
            {place.description}
          </>
        ),
        marker: [Number(place.latitude), Number(place.longitude)]
      }))
      setStoryPlacesList([...storyPlacesList, { storyId, storyTitle, markers: computedMarkers }])
      setMarkers([...markers, ...computedMarkers])
    })
  }, [list])

  return (
    <Box
      component={Paper}
      sx={{
        width: '100%',
        display: 'flex',
        padding: 3,
        flexFlow: 'column'
      }}
    >
      <Box
        sx={{
          maxWidth: '422px',
          marginBottom: 3
        }}
      >
        <TextField
          size="small"
          key="search"
          name="search"
          fullWidth
          rows={4}
          autoComplete="off"
          placeholder="Type place name for filter list"
          margin="dense"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </Box>

      <Box sx={{ width: '100%', height: '500px', display: 'flex' }}>
        <Box
          sx={{ top: 10, left: 10, width: '250px', height: '100%', bgcolor: 'background.default', overflow: 'auto' }}
        >
          <List>
            {storyPlacesList.map(s => (
              <li key={s.storyTitle}>
                <ul>
                  <ListSubheader>{s.storyTitle}</ListSubheader>
                  {s.markers
                    .filter(p => p.title?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
                    .map(m => (
                      <ListItem
                        selected={m.id === openMarker}
                        onMouseEnter={() => setOpenMarker(m.id)}
                        onMouseLeave={() => setOpenMarker(undefined)}
                        key={m.id}
                      >
                        <ListItemText>{m.title}</ListItemText>
                      </ListItem>
                    ))}
                </ul>
              </li>
            ))}
          </List>
        </Box>
        <Box sx={{ top: 10, left: 10, flex: 1, height: '100%' }}>
          <MapViewer
            openMarker={openMarker}
            markers={markers.filter(p => p.title?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Places
