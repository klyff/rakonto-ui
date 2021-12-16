import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Timeline from '@mui/lab/Timeline'
import Event from '../../../components/Event'
import { format, parseJSON } from 'date-fns'
import Typography from '@mui/material/Typography'
import { StoryType, TimelineType } from '../../../lib/types'

interface iTimelines {
  list: StoryType[]
}

const sortByDate = (a: TimelineType, b: TimelineType) =>
  parseJSON(b.at as unknown as string).getTime() - parseJSON(a.at as unknown as string).getTime()

const Timelines: React.FC<iTimelines> = ({ list }) => {
  const [events, setEvents] = useState<(TimelineType & { storyTitle: string; storyId: string })[]>([])

  useEffect(() => {
    list.forEach(s => {
      setEvents([...events, ...s.timelineEntries.map(t => ({ storyId: s.id, storyTitle: s.title, ...t }))])
    })
  }, [list])
  return (
    <Box
      sx={{
        width: '100%',
        marginTop: 3
      }}
    >
      <Box
        sx={{
          marginBottom: 3
        }}
      >
        {events.length ? (
          <Box sx={{ width: '100%' }}>
            <Timeline position="alternate">
              {events.sort(sortByDate).map(e => (
                <Event
                  key={e.id}
                  opositeTitle={
                    <>
                      {format(parseJSON(e.at as unknown as string), 'PPP')}
                      <br />
                      <Link href={`/a/stories/${e.storyId}`} variant="caption">
                        {e.storyTitle}
                      </Link>
                    </>
                  }
                  content={
                    <>
                      <Typography variant="h6" component="span">
                        {e.title}
                      </Typography>
                      <Typography sx={{ lineBreak: 'anywhere' }} paragraph>
                        {e.description}
                      </Typography>
                    </>
                  }
                />
              ))}
            </Timeline>
          </Box>
        ) : (
          <Typography align="center">Nothing here yet.</Typography>
        )}
      </Box>
    </Box>
  )
}

export default Timelines
