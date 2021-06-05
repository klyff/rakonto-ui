import React from 'react'
import { Loader, Dimmer } from 'semantic-ui-react'
import { ImageProps } from 'semantic-ui-react/dist/commonjs/elements/Image/Image'

interface iLoadingArea extends ImageProps {
  isLoading: boolean
  progress?: number
  message?: string
}

const LoadingArea: React.FC<iLoadingArea> = ({ isLoading, message, children, progress }) => {
  return (
    <>
      {isLoading && (
        <Dimmer inverted active={isLoading}>
          <Loader>
            {progress !== undefined && `${progress}%`}
            {message && (
              <>
                <br />
                {message}
              </>
            )}
          </Loader>
        </Dimmer>
      )}
      {!isLoading && children}
    </>
  )
}

export default LoadingArea
