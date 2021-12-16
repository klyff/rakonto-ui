import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { SimpleDialogContext } from '../../../../components/SimpleDialog'
import Button from '@mui/material/Button'
import api from '../../../../lib/api'
import { SimpleSnackbarContext } from '../../../../components/SimpleSnackbar'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { TimelineType } from '../../../../lib/types'
import CreateTimeline from './CreateTimeline'
import { format, parseJSON } from 'date-fns'

interface iTimelines {
  timelines: TimelineType[]
  canEdit: boolean
  storyId: string
}

const sortByDate = (a: TimelineType, b: TimelineType) =>
  parseJSON(b.at as unknown as string).getTime() - parseJSON(a.at as unknown as string).getTime()

const Timelines: React.FC<iTimelines> = ({ timelines, canEdit, storyId }) => {
  const { actions: simpleDialogActions } = useContext(SimpleDialogContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [events, setEvents] = useState<TimelineType[]>(timelines)

  const handleDelete = async (timeline?: TimelineType) => {
    if (!timeline) {
      snackActions.open('Something was wrong! please try again.')
      return
    }
    simpleDialogActions.open(
      'Delete event',
      <>
        <Typography>Are you sure want to delete the event</Typography>
        <Typography fontWeight="700" component="span">{` "${timeline.title}" `}</Typography>
        <Typography component="span">from this story?</Typography>
      </>,
      { okText: 'Yes, delete', showOk: true, cancelText: 'Back' },
      async success => {
        try {
          if (success) {
            await api.deleteTimeline(timeline.id)
            setEvents(events.filter(p => p.id !== timeline.id))
            snackActions.open(`${timeline.title} removed from this story!`)
          }
        } catch (error) {
          // @ts-ignore
          const { data } = error
          if (data.code) {
            snackActions.open(`Error to add ${timeline.title} to this story!`)
            return
          }
          snackActions.open('Something was wrong! please try again.')
        }
      }
    )
  }

  const handleCloseDialog = (timeline?: TimelineType) => {
    debugger
    if (timeline) {
      setEvents([...events, timeline])
    }
    setIsOpen(false)
  }

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
      {canEdit && (
        <>
          {isOpen && <CreateTimeline storyId={storyId} onClose={handleCloseDialog} />}
          <Box>
            <Typography sx={{ marginBottom: 3 }} gutterBottom>
              A timeline helps the user to better understand a story.
            </Typography>
            <Button variant="outlined" onClick={() => setIsOpen(true)} sx={{ mt: 1, mr: 1 }}>
              Add event
            </Button>
          </Box>
        </>
      )}

      <Divider sx={{ margin: '24px 0' }} />
      <Box
        sx={{
          marginBottom: 3
        }}
      >
        {events.length ? (
          <Box sx={{ width: '100%' }}>
            <Timeline position="alternate">
              {events.sort(sortByDate).map(e => (
                <TimelineItem key={e.id}>
                  <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
                    {canEdit && (
                      <IconButton onClick={() => handleDelete(e)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                    {format(parseJSON(e.at as unknown as string), 'PPP')}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                      {e.title}
                    </Typography>
                    <Typography sx={{ lineBreak: 'anywhere' }} paragraph>
                      {e.description}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
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
