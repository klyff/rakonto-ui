// import { VideoJsPlayer } from 'video.js'

import { LatLngExpression } from 'leaflet'
import { ReactNode } from 'react'

export type apiOptions = {
  errorBoundary: boolean
}

export type markerType = {
  id: string
  title?: string
  content?: string | ReactNode
  marker: LatLngExpression
  place?: PlaceType
}

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

export type SearchResultKindType = 'COLLECTION' | 'STORY'

export type SearchResultType = {
  id: string
  kind: SearchResultKindType
  title: string
}

export type UserQuotaType = {
  available: string
  used: string
  free: string
  percentual: number
}

export type UserType = {
  id: string
  email: string
  firstName: string
  lastName: string
  picture: ImageType
  keepOnlyOptimized: boolean
  about: string
  location: string
  tier: number
  trial: boolean
  freeTrialUntilAt: string
  organizations: OrganizationType[]
  teams: UserType[]
}

export type UserFormType = {
  firstName?: string
  lastName?: string
  about?: string
  pictureId?: string | null
  location?: string
}

export type AuthType = {
  token: string
  user: UserType
}

export type ShortIdType = {
  url: string
}

export type SigninFormType = {
  email: string
  password: string
}

export type SigninFormFacebook = {
  token: string
}

export type SigninFormGoogle = {
  token: string
}

export type SingupFormType = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmation: string
  allowEmail: boolean
  allowShareInfo: boolean
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
  url?: string
  gifUrl?: string
  thumbnailUrl?: string
}

export type AudioDetails = {
  id: string
  url?: string
  gifUrl?: string
  thumbnailUrl?: string
}

export type StoryType = {
  audio: AudioDetails
  collections: CollectionType[]
  cover: ImageType
  description: string
  id: string
  thumbnailUrl: string
  downloadUrl: string
  ready: boolean
  publicAcl: boolean
  published: boolean
  title: string
  owner: UserType
  type: MediaType
  video: VideoDetails
  watchers: Watcher[]
  persons: PersonType[]
  files: FileType[]
  links: LinkType[]
  transcription: TranscriptionType
  galleryEntries: GalleryType[]
  timelineEntries: TimelineType[]
  places: PlaceType[]
  subtitles: SubtitleType[]
  submission: SubmissipnType
  updatedAt: string
  duration: string
  mimeType: string
  url: string
}

export type StoryCreateType = {
  title: string
  description: string
}

export type StoryUpdateType = {
  title?: string
  description?: string
  coverId?: string
  collections?: string[]
}

export type CollectionType = {
  entity: string
  id: string
  title: string
  description: string
  cover: ImageType
  owner: UserType
  thumbnailUrl: string
  downloadUrl: string
  stories: StoryType[]
  publicAcl: boolean
  watchers: Watcher[]
  updatedAt: string
  type: string
}

export type CollectionFormType = {
  title?: string
  description?: string
  coverId?: string
  type?: string
}

export type ImageType = {
  id: string
  url: string
  thumbnailUrl: string
  originalName: string
}

export type GalleryType = {
  id: string
  image: ImageType
  updatedAt: Date
  createdAt: Date
}

export type FileType = {
  id: string
  createdAt: Date
  name: string
  originalName: string
  url: string
  size: number
  mimeType: string
}

export type SubtitleType = FileType & {
  language: LanguageEnum
}

export type LinkType = {
  id: string
  url: string
}

export type TranscriptionType = {
  id: string
  content: string
  storyId: string
  updatedAt: Date
  createdAt: Date
}

export type WatcherType = 'VIEWER' | 'EDITOR'

export type Watcher = {
  id: string
  email: string
  notifiedAt: Date
  updatedAt: Date
  createdAt: Date
  user: UserType
  type: WatcherType
}

export type PersonFormType = {
  name: string
  link: string
  pictureId: string | null
}

export type LinkFormType = {
  url: string
  storyId: string
}

export type TranscriptionFormType = {
  content: string
  storyId: string
}

export type PersonType = {
  id: string
  name: string
  link: string
  picture: ImageType | null
}

export type TimelineType = {
  id: string
  title: string
  description: string
  at: Date
}

export type TimelineFormType = {
  storyId: string
  title: string
  description: string
  at: Date
}

export type PlaceType = {
  id: string
  name: string
  description?: string
  location?: string
  latitude?: string
  longitude?: string
}

export type PlaceFormType = {
  name: string
  description: string
  location: string
  latitude: string
  longitude: string
}

export type addWatcherType = {
  id: string
  email: string
  type: WatcherType
}

export enum AssetTypes {
  'collection' = 'collection',
  'story' = 'story'
}

export type CommentType = {
  id: string
  parentId: string
  author: UserType
  body: string
  mentions: UserType[]
  updatedAt: Date
}

export type CommentFormType = {
  commentableId: string
  commentableType: 'collection' | 'story'
  body: string
  parentId?: string
}

export type LocationSearchType = {
  boundingbox?: string[]
  class?: string
  // eslint-disable-next-line camelcase
  display_name: string
  icon?: string
  importance?: number
  lat: string
  licence?: string
  lon: string
  osmId?: number
  osmType?: string
  placeId?: number
  type?: string
}

export type InviteInput = {
  collectionId: string
  organizationId: string | null
  title: string
  description: string
  requestedMediaType: MediaType | null
  requestedMediaLength: number
  dueAt: Date
  callToActionInstructions: string
  callToActionButtonLabel: string
  callToAction: string
}

export type InviteType = {
  id: string
  collectionId: string
  collectionTitle: string
  organization: OrganizationType
  video: {
    id: string
    url: string
    thumbnailUrl: string
    gifUrl: string
  }
  title: string
  description: string
  requestedMediaType: MediaType
  requestedMediaLength: number
  user: UserType
  token: string
  url: string
  dueAt: Date
  createdAt: string
  ready: boolean
  callToActionInstructions: string
  callToActionButtonLabel: string
  callToAction: string
}

export type InviteContributorInput = {
  storyId: string
  title: string
  description: string
  requestedMediaType: 'FILE' | 'GALLERY_ENTRY' | null
  dueAt: Date
}

export type InviteContributorType = {
  id: string
  storyId: string
  title: string
  description: string
  requestedMediaType: 'FILE' | 'GALLERY_ENTRY' | null
  user: UserType
  token: string
  url: string
  dueAt: Date
  createdAt: Date
}

export type SubmissipnType = {
  createdAt: Date
  id: string
  invite: InviteType
  email: string
  name: string
  storyId: string
}

export enum LanguageEnum {
  'arabic' = 'arabic',
  'brazilianPortuguese' = 'brazilian portuguese',
  'danish' = 'danish',
  'dutch' = 'dutch',
  'english' = 'english',
  'farsi' = 'farsi',
  'finnish' = 'finnish',
  'french' = 'french',
  'greek' = 'greek',
  'hebrew' = 'hebrew',
  'indonesian' = 'indonesian',
  'italian' = 'italian',
  'malay' = 'malay',
  'norwegian' = 'norwegian',
  'romanian' = 'romanian',
  'spanish' = 'spanish',
  'swedish' = 'swedish',
  'turkish' = 'turkish',
  'vietnamese' = 'vietnamese',
  'albanian' = 'albanian',
  'armenian' = 'armenian',
  'azerbaijani' = 'azerbaijani',
  'basque' = 'basque',
  'belarusian' = 'belarusian',
  'bengali' = 'bengali',
  'bosnian' = 'bosnian',
  'bulgarian' = 'bulgarian',
  'burmese' = 'burmese',
  'catalan' = 'catalan',
  'chinese' = 'chinese',
  'croatian' = 'croatian',
  'czech' = 'czech',
  'esperanto' = 'esperanto',
  'estonian' = 'estonian',
  'georgian' = 'georgian',
  'german' = 'german',
  'greenlandic' = 'greenlandic',
  'hindi' = 'hindi',
  'hungarian' = 'hungarian',
  'icelandic' = 'icelandic',
  'japanese' = 'japanese',
  'kannada' = 'kannada',
  'korean' = 'korean',
  'kurdish' = 'kurdish',
  'latvian' = 'latvian',
  'lithuanian' = 'lithuanian',
  'macedonian' = 'macedonian',
  'malayalam' = 'malayalam',
  'manipuri' = 'manipuri',
  'mongolian' = 'mongolian',
  'nepali' = 'nepali',
  'pashto' = 'pashto',
  'polish' = 'polish',
  'portuguese' = 'portuguese',
  'punjabi' = 'punjabi',
  'russian' = 'russian',
  'serbian' = 'serbian',
  'sinhala' = 'sinhala',
  'slovak' = 'slovak',
  'slovenian' = 'slovenian',
  'somali' = 'somali',
  'sundanese' = 'sundanese',
  'swahili' = 'swahili',
  'tagalog' = 'tagalog',
  'tamil' = 'tamil',
  'telugu' = 'telugu',
  'thai' = 'thai',
  'ukrainian' = 'ukrainian',
  'urdu' = 'urdu',
  'yoruba' = 'yoruba'
}

export type ProductSubscriptionType = {
  id: string
  stripePriceId: string
  stripeSubscriptionId: string
  updatedAt: Date
  createdAt: Date
}

export type OrganizationType = {
  id: string
  memberships: OrganizationMemberType[]
  logo: ImageType
  name: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
  email: string
  socialFacebook?: string
  socialTwitter?: string
  socialInstagram?: string
  socialLinkedin?: string
  socialWhatsapp?: string
  updatedAt: Date
  createdAt: Date
}

export type OrganizationInput = {
  logoId?: string | null
  name: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
  email: string
  socialFacebook?: string
  socialTwitter?: string
  socialInstagram?: string
  socialLinkedin?: string
  socialWhatsapp?: string
}

export type OrganizationMemberType = {
  id: string
  user: UserType
  status: '??CCEPETD' | 'PENDING' | 'DECLINED'
}

export type TeamMemberType = {
  id: string
  user: UserType
  updatedAt: Date
  createdAt: Date
}
