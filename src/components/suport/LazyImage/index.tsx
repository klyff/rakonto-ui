import React, { useState } from 'react'
import { Image, Placeholder } from 'semantic-ui-react'
import { ImageProps } from 'semantic-ui-react/dist/commonjs/elements/Image/Image'
import { LazyImageWrapper } from './style'

interface iLazeImage extends ImageProps {
  height: number
}

const LazyImage: React.FC<iLazeImage> = ({ height, ...rest }) => {
  const [isLoasing, setLoading] = useState<boolean>(true)

  const handleLoaded = () => {
    setLoading(false)
  }

  return (
    <LazyImageWrapper className="lazyImage" height={height}>
      <Image {...rest} onLoad={() => handleLoaded()} onError={() => handleLoaded()} />
      {isLoasing && (
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
      )}
    </LazyImageWrapper>
  )
}

export default LazyImage
