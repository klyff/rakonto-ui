import React, { useEffect, useState } from 'react'
import { markerType, StoryType } from '../../../lib/types'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import MapViewer from '../../../components/MapViewer'
import List from '@mui/material/List'
import MovieIcon from '@mui/icons-material/Movie'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import { LatLngExpression } from 'leaflet'

interface iPlace {
  list: StoryType[]
}

const Places: React.FC<iPlace> = ({ list }) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [openMarker, setOpenMarker] = useState<string | undefined>(undefined)
  const [position, setPosition] = useState<LatLngExpression | undefined>(undefined)
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
            <strong>{place.name}</strong>
            <br />
            {place.description}
          </>
        ),
        marker: [Number(place.latitude), Number(place.longitude)]
      }))
      setStoryPlacesList(old => [...old, { storyId, storyTitle, markers: computedMarkers }])
      setMarkers(old => [...old, ...computedMarkers])
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
          sx={{
            top: 10,
            left: 10,
            width: '422px',
            height: '100%',
            bgcolor: 'background.default',
            overflow: 'auto',
            marginRight: 4
          }}
        >
          <List>
            {storyPlacesList.map(s => (
              <li key={s.storyTitle}>
                <ul>
                  <ListSubheader
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <MovieIcon />
                    <Box sx={{ paddingLeft: 1 }}>{s.storyTitle}</Box>
                  </ListSubheader>
                  {s.markers
                    .filter(p => p.title?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
                    .map(m => (
                      <ListItemButton
                        onMouseEnter={() => {
                          setOpenMarker(m.id)
                          setPosition(m.marker)
                        }}
                        onMouseLeave={() => setOpenMarker(undefined)}
                        key={m.id}
                        onClick={() => {
                          setOpenMarker(m.id)
                          setPosition(m.marker)
                        }}
                      >
                        <ListItemText>{m.title}</ListItemText>
                      </ListItemButton>
                    ))}
                </ul>
              </li>
            ))}
          </List>
        </Box>
        <Box sx={{ top: 10, left: 10, flex: 1, height: '100%' }}>
          <MapViewer
            openMarker={openMarker}
            initialZoom={position ? 12 : 0}
            position={position}
            markers={markers.filter(p => p.title?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Places
