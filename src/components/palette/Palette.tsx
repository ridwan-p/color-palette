import clsx from 'clsx'
import { VectorPalette } from 'models/PaletteModel'
import React from 'react'
import { invertColor } from '../../helpers/colors'
import styles from './Palette.module.scss'

type Props = {
  colors: VectorPalette
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
          onClick={() => handleCopy(item.hex)}
          className={styles['palette-color']}
          style={{ background: item.hex, color: invertColor(item.hex, true) }}
        >
          <span>{item.hex}</span>
        </div>
      ))}
    </div>
  )
}