export type Pageable<T> = {
  totalPages: number
  totalElements: number
  size: number
  content: T[]
  number: number
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  numberOfElements: number
  pageable: {
    offset: number
    sort: {
      sorted: boolean
      unsorted: boolean
      empty: boolean
    }
    pageNumber: 0
    unpaged: boolean
    paged: boolean
    pageSize: 0
  }
  first: boolean
  last: boolean
  empty: boolean
}

export type UserType = {
  id: string
  email: string
  firstName: string
  lastName: string
  picture: ImageType
  about: string
  location: string
}

export type UserFormType = {
  firstName: string
  lastName: string
  pictureId: string
  about: string
  location: string
}

export type AuthType = {
  token: string
  user: UserType
}

export type SigninFormType = {
  email: string
  password: string
}

export type SingupFormType = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmation: string
}

export type PasswordResetForm = {
  token: string
  confirmation: string
  password: string
}

export type PasswordChangeForm = {
  newPassword: string
  confirmation: string
  password: string
}

export type MediaType = 'AUDIO' | 'VIDEO'
export enum Resolutions {
  '360p' = '360p',
  '480p' = '480p',
  '720p' = '720p',
  '1028p' = '1028p'
}

export type Media = {
  id: string
  info: Partial<{
    [key: string]: string | number | null
  }>
  url: string
}

export type Gif = {
  id: string
  resolution: string
  url: string
}

export type Thumbnail = {
  id: string
  num: number
  resolution: string
  url: string
}

export type VideoDetails = {
  id: string
  processedAt?: Date
  alternatives: Partial<Record<Resolutions, Media[]>>
  gifs: Partial<Record<Resolutions, Gif[]>>
  thumbnails: Partial<Record<Resolutions, Thumbnail[]>>
  thumbnail: string
}

export type AudioDetails = {
  id: string
  processedAt: Date
  alternatives: Media[]
}

export type StoryType = {
  audio?: AudioDetails
  collections: CollectionType[]
  cover?: { id?: string }
  description?: string
  id?: string
  thumbnail: string
  ready?: boolean
  published?: boolean
  title?: string
  type?: MediaType
  video?: VideoDetails
  watchers?: WatcherType[]
  persons: PersonType[]
}

export type StoryUpdateType = {
  title: string
  description: string
  published: boolean
  coverId: string
  collectionsToAdd: string[]
  collectionsToRemove: string[]
  watchersToAdd: string[]
  watchersToRemove: string[]
}

export type CollectionType = {
  id: string
  title: string
  description: string
  cover: ImageType
  watchers: WatcherType[]
  thumbnail: string
  stories: StoryType[]
}

export type ImageType = {
  id: string
  processedAt: Date
  thumbnail: string
  thumbnails: Record<
    string,
    {
      id: string
      url: string
      resolution: string
    }
  >[]
}

export type WatcherType = {
  email: string
  user: UserType
}

export type PersonFormType = {
  name: string
  description: string
  pictureId: string
}

export type PersonType = {
  id: string
  name: string
  description: string
  picture: ImageType
}
