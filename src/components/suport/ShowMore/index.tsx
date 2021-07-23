import React, { useState } from 'react'
import Truncate from 'react-truncate'

interface iShowMore {
  lines?: number
  more?: JSX.Element | string
  less?: JSX.Element | string
  anchorClass?: string
}

const ShowMore: React.FC<iShowMore> = ({
  children,
  lines = 3,
  more = 'Show more',
  less = 'Show less',
  anchorClass = ''
}) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const [truncated, setTruncated] = useState<boolean>(false)

  const handleTruncate = (value: boolean) => {
    if (value !== truncated) {
      setTruncated(value)
    }
  }

  const toggleLines = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setExpanded(!expanded)
  }

  return (
    <div>
      <Truncate
        lines={!expanded && lines}
        ellipsis={
          <span>
            ...{' '}
            <a href="#" className={anchorClass} onClick={toggleLines}>
              {more}
            </a>
          </span>
        }
        onTruncate={handleTruncate}
      >
        {children}
      </Truncate>
      {!truncated && expanded && (
        <span>
          {' '}
          <a href="#" className={anchorClass} onClick={toggleLines}>
            {less}
          </a>
        </span>
      )}
    </div>
  )
}

export default ShowMore
