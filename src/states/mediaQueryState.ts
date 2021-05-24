import { selector } from 'recoil'
import matchMedia from 'matchmediaquery'

export interface MediaQueryState {
  isMobile: boolean
}

export const mediaQueryState = selector<MediaQueryState>({
  key: 'mediaQueryState',
  get: () => ({
    isMobile: matchMedia('(max-width: 767px)').matches
  })
})
