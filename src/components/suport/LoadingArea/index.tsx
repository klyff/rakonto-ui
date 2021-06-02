import React from 'react'
import { Loader, Dimmer } from 'semantic-ui-react'
import { ImageProps } from 'semantic-ui-react/dist/commonjs/elements/Image/Image'

interface iLoadingArea extends ImageProps {
  isLoading: boolean
  progress?: number
}

const LoadingArea: React.FC<iLoadingArea> = ({ isLoading, children, progress }) => {
  return (
    <>
      {isLoading && (
        <Dimmer inverted active={isLoading}>
          <Loader>{progress ? `${progress}%` : 'loading'}</Loader>
        </Dimmer>
      )}
      {!isLoading && children}
    </>
  )
}

export default LoadingArea
