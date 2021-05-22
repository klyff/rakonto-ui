import React, { useState } from 'react'
import { Image, Placeholder } from 'semantic-ui-react'
import { ImageProps } from 'semantic-ui-react/dist/commonjs/elements/Image/Image'

const LazyImage: React.FC<ImageProps> = ({ style, ...rest }) => {
  const [isLoasing, setLoading] = useState<boolean>(true)

  const showImage = () => {
    setLoading(false)
  }

  return (
    <div
      className="lazyImage"
      style={{
        position: 'relative'
      }}
    >
      <Image {...rest} style={style} onLoad={() => showImage()} />
      {isLoasing && (
        <Placeholder
          style={{
            ...style,
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          <Placeholder.Image square />
        </Placeholder>
      )}
    </div>
  )
}

export default LazyImage
