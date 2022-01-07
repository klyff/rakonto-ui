import React from 'react'
import Box from '@mui/material/Box'
import { StoryType } from '../../../lib/types'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import LinkPreview from '../../../components/LinkPreview'
import ListItem from '@mui/material/ListItem'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'

interface iLinks {
  list: StoryType[]
}

const Links: React.FC<iLinks> = ({ list }) => {
  return (
    <Box
      sx={{
        marginBottom: 3
      }}
    >
      {list.length ? (
        <List>
          {list
            .filter(story => !!story.links.length)
            .map(story => (
              <li key={`section-${story.id}`}>
                <ul>
                  <ListSubheader>
                    <Link href={`/a/stories/${story.id}`}>{story.title}</Link>
                  </ListSubheader>
                  {story.links.map(link => (
                    <ListItem key={link.id}>
                      <Box sx={{ width: '100%' }}>
                        <LinkPreview link={link} />
                      </Box>
                    </ListItem>
                  ))}
                </ul>
              </li>
            ))}
        </List>
      ) : (
        <Typography sx={{ padding: '16px 0px' }} align="center">
          No links here.
        </Typography>
      )}
    </Box>
  )
}

export default Links
