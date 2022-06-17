import React from "react"
import clsx from "clsx"

import styles from "./InputGroup.module.scss"

type Props = {
  placeholder?: string
  btnLabel: string
  onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
  value: string
  onChangeValue(e: React.ChangeEvent<HTMLInputElement>): void
  className?: string
}

export const InputGroup: React.FC<Props> = ({
  placeholder,
  btnLabel,
  onClick,
  value,
  onChangeValue,
  className
}) => {

  return (
    <>
      <div className={clsx(
        'input-group',
        styles['input-group'],
        className
      )}>
        <input
          type="text"
          className={clsx(
            'form-control',
            styles['form-control']
          )}
          placeholder={placeholder}
          value={value}
          onChange={onChangeValue}
        />
        <button
          className={clsx(
            'btn btn-primary',
            styles.btn
          )}
          type="button"
          onClick={onClick}
        >{btnLabel}</button>
      </div>
    </>
  )
}