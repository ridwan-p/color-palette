import React from "react"
import clsx from "clsx"
import styles from "./Color.module.scss"

type Props = {
  // onCopy(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void
  className?: string
  color: string
  style?: React.CSSProperties
}

export const Color: React.FC<Props> = ({
  className,
  color,
  style,
  // onCopy
}) => {
  if (color[0] !== '#') color = `#${color}`
  return (
    <div
      // onClick={onCopy}
      className={clsx(styles.color, className)}
      style={{ ...style, background: color }}
    ></div>
  )
}