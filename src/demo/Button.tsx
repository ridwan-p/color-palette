import clsx from "clsx"
import React from "react"

type Props = {
  className?:string
}

export const Button:React.FC<Props> = ({
  children,
  className
}) => {
  return <button className={clsx('btn btn-demo', className)}>{children}</button>
}