import React from 'react'
import clsx from 'clsx'
import { Palette } from '..'
import './ImagePalette.scss'
type Props = {
  colors: string[]
  className?: string
  urlImage: string
}

export const ImagePalette: React.FC<Props> = ({
  colors,
  className,
  urlImage,
}) => {
  return (
    <div className={clsx('image-palette', className)} >
      <img src={urlImage} alt="palette" />
      <Palette
        colors={colors}
        isRounded={false}
      />
    </div>
  )
}