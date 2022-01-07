import React from 'react'
import Box from '@mui/material/Box'
import { StoryType } from '../../../lib/types'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'

interface iFiles {
  list: StoryType[]
}

const Files: React.FC<iFiles> = ({ list }) => {
  return (
    <Box
      sx={{
        marginBottom: 3
      }}
    >
      {list.length ? (
        <List>
          {list
            .filter(story => !!story.files.length)
            .map(story => (
              <li key={`section-${story.id}`}>
                <ul>
                  <ListSubheader>
                    <Link href={`/a/stories/${story.id}`}>{story.title}</Link>
                  </ListSubheader>
                  {story.files.map(file => (
                    <ListItem key={file.id}>
                      <ListItemText primary={<Link href={file.url}>{file.originalName}</Link>} />
                    </ListItem>
                  ))}
                </ul>
              </li>
            ))}
        </List>
      ) : (
        <Typography sx={{ padding: '16px 0px' }} align="center">
          No files here.
        </Typography>
      )}
    </Box>
  )
}

export default Files
