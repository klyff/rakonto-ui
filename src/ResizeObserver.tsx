import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { mediaQueryState } from '@root/states/mediaQueryState'
import matchMedia from 'matchmediaquery'

export const ResizeObserver: React.FC = () => {
  const set = useSetRecoilState(mediaQueryState)

  useEffect(() => {
    function handleResize() {
      const isMobile = matchMedia('(max-width: 767px)').matches
      const isTablet = matchMedia('(max-width: 1024px)').matches
      set({ isMobile, isTablet })
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return null
}

export default ResizeObserver
