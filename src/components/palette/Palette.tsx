import clsx from 'clsx'
import React from 'react'
import { invertColor } from '../../helpers/colors'
import styles from './Palette.module.scss'

type Props = {
  colors: string[]
  className?: string
  isRounded?: boolean
}

export const Palette: React.FC<Props> = ({
  colors,
  className
}) => {
  const handleCopy = (color: string) => {
    navigator.clipboard.writeText(color);
  }
  return (
    <div className={clsx(styles['palette'], className)}>
      {colors.map((item, key) => (
        <div
          key={key}
          onClick={() => handleCopy(item)}
          className={styles['palette-color']}
          style={{ background: item, color: invertColor(item, true) }}
        >
          <span>{item}</span>
        </div>
      ))}
    </div>
  )
}