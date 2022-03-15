import React from 'react'
import { Palette } from '..'
// style 
import "./CardPalette.scss"

type Props = {
  colors: string[]
  totalLike?: number
  date?: string
}

export const CardPalette: React.FC<Props> = ({
  colors,
  totalLike = 0,
  date = '6 days'
}) => {
  return (
    <div className="card">
      <div className="card-body">
        <Palette colors={colors} />
      </div>
      <div className="card-footer">
        <div className="icon text-red">
          <i className="bi bi-heart-fill"></i>
          <span>{totalLike}</span>
        </div>
        <div className="upload-date">{date}</div>
      </div>
    </div >
  )
}