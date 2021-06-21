import { selector } from 'recoil'
import matchMedia from 'matchmediaquery'

export interface MediaQueryState {
  isMobile: boolean
  isTablet: boolean
}

export const mediaQueryState = selector<MediaQueryState>({
  key: 'mediaQueryState',
  get: () => ({
    isMobile: matchMedia('(max-width: 767px)').matches,
    isTablet: matchMedia('(max-width: 1024px)').matches
  })
})
