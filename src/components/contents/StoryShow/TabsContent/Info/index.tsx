import React from 'react'
import { StoryType } from '@root/types'
import CommentThread from '@root/components/suport/CommentThread'
import ShowMore from '@root/components/suport/ShowMore'
import { Header } from 'semantic-ui-react'
import { Title, Description, Author } from './style'
import Avatar from '@root/components/suport/Avatar'

interface iInfo {
  story: Partial<StoryType>
}

const Info: React.FC<iInfo> = ({ story }) => {
  return (
    <>
      <Title>{story.title}</Title>
      <ShowMore>
        <Description>{story.description}</Description>
      </ShowMore>

      <Header as="h3" dividing>
        About the author
      </Header>
      <Author>
        <Avatar name={'Philipe Carrazzoni'} src="https://avatars0.githubusercontent.com/u/246180?v=4" />
        <span>Joseph Klimber</span>
      </Author>
      <ShowMore>
        <Description>{story.description}</Description>
      </ShowMore>
      <Header as="h3" dividing>
        Comments
      </Header>
      <CommentThread story={story} />
    </>
  )
}

export default Info
