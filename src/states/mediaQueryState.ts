import { selector, atom } from 'recoil'
import matchMedia from 'matchmediaquery'

export interface MediaQueryState {
  isMobile: boolean
  isTablet: boolean
}

export const mediaQueryState = atom<MediaQueryState>({
  key: 'mediaQueryState',
  default: {
    isMobile: matchMedia('(max-width: 767px)').matches,
    isTablet: matchMedia('(max-width: 1024px)').matches
  }
})
