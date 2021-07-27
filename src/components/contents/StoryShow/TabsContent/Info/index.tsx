import React from 'react'
import { CommentType, UserType, WatcherType } from '@root/types'
import CommentThread from '@root/components/suport/CommentThread'
import ShowMore from '@root/components/suport/ShowMore'
import { Header } from 'semantic-ui-react'
import { Title, Description, Author, SecondTitle } from './style'
import Avatar from '@root/components/suport/Avatar'

interface iInfo {
  description: string
  title: string
  subTitle: string
  owner: UserType
  comments: CommentType[]
  watchers: WatcherType[]
  storyId: string
}

const Info: React.FC<iInfo> = ({ storyId, description, title, subTitle, owner, watchers, comments }) => {
  const name = `${owner.firstName.charAt(0).toUpperCase() + owner.firstName.slice(1)} ${
    owner.lastName.charAt(0).toUpperCase() + owner.lastName.slice(1)
  }`
  return (
    <>
      <Title>{title}</Title>
      {subTitle && <SecondTitle>{subTitle}</SecondTitle>}
      <ShowMore>
        <Description>{description}</Description>
      </ShowMore>

      <Header as="h3" dividing>
        About the author
      </Header>
      <Author>
        <Avatar name={name} picture={owner?.picture?.thumbnail} />
        <span>{name}</span>
      </Author>
      <ShowMore>
        <Description>{owner.about}</Description>
      </ShowMore>
      <Header as="h3" dividing>
        Comments
      </Header>
      <CommentThread comments={comments} watchers={watchers} id={storyId} />
    </>
  )
}

export default Info
