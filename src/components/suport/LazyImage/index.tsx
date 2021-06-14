import React, { useState } from 'react'
import { Image, Placeholder } from 'semantic-ui-react'
import { ImageProps } from 'semantic-ui-react/dist/commonjs/elements/Image/Image'
import { LazyImageWrapper } from './style'

interface iLazeImage extends ImageProps {
  height: number
}

const LazyImage: React.FC<iLazeImage> = ({ height, src, ...rest }) => {
  const [isLoading, setLoading] = useState<boolean>(true)

  const handleLoaded = () => {
    setLoading(false)
  }

  return (
    <LazyImageWrapper className="lazyImage" height={height}>
      <Image src={src || ''} {...rest} onLoad={() => handleLoaded()} onError={() => handleLoaded()} />
      {isLoading && <Placeholder />}
    </LazyImageWrapper>
  )
}

export default LazyImage
