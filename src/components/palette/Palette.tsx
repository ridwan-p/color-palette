import clsx from 'clsx'
import React from 'react'
import './Palette.scss'

type Props = {
  colors: string[]
}

export const Palette: React.FC<Props> = ({
  colors
}) => {
  const length = colors.length
  return (
    <div className="palette">
      {colors.map((item, key) => (
        <div
          key={key}
          className={clsx(
            'palette-color',
            {
              first: key === 0,
              last: (key + 1) === length
            }
          )}
          style={{ background: item, width: `${100 / length}%` }}
        />
      ))}
    </div>
  )
}