import clsx from 'clsx'
import React from 'react'
import { invertColor } from '../../helpers/colors'
import './Palette.scss'

type Props = {
  colors: string[]
  className?: string
  isRounded?: boolean
}

export const Palette: React.FC<Props> = ({
  colors,
  className,
  isRounded = true
}) => {
  const handleCopy = (color: string) => {
    navigator.clipboard.writeText(color);
  }
  const length = colors.length
  return (
    <div className={clsx('palette', className)}>
      {colors.map((item, key) => (
        <div
          key={key}
          onClick={() => handleCopy(item)}
          className={clsx(
            'palette-color',
            {
              first: key === 0 && isRounded,
              last: (key + 1) === length && isRounded
            }
          )}
          style={{ background: item, color: invertColor(item, true) }}
        >
          <span>{item}</span>
        </div>
      ))}
    </div>
  )
}