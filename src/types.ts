export type MediaType = 'AUDIO' | 'VIDEO'
export enum Resolutions {
  '360p' = '360p',
  '480p' = '480p',
  '720p' = '720p',
  '1028p' = '1028p'
}

export type Video = {
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
  alternatives: Partial<Record<Resolutions, Video[]>>
  gifs: Partial<Record<Resolutions, Gif[]>>
  thumbnails: Partial<Record<Resolutions, Thumbnail[]>>
}

export type StoryType = {
  audio?: string
  collections: []
  cover?: string
  description?: string
  id?: string
  thumbnail: string
  ready?: boolean
  title?: string
  type?: MediaType
  video?: VideoDetails
}

export type StoryUpdateType = {
  title: string
  description: string
  published: true
  coverId: string
  collectionsToAdd: string[]
  collectionsToRemove: string[]
  watchersToAdd: string[]
  watchersToRemove: string[]
}

export type ImageUploadType = {
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
