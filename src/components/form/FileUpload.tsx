import React, { useRef, useState } from "react"
import { placeholder } from "assets"

import "./FileUpload.scss"
import clsx from "clsx"

type Props = {
  onChange(file: File): void
}

export const FileUpload: React.FC<Props> = ({
  onChange
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isAcvite, setIsActive] = useState(false)

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsActive(false)
    const files = e.dataTransfer.files
    if (files?.[0]) {
      onChange(files[0])
    }
  }

  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
    setIsActive(true)
    return false
  }

  const handleOnDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
    setIsActive(false)
    return false
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const files = e.target.files
    if (files?.[0]) {
      onChange(files[0])
    }
  }

  const handleOnClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }


  return (
    <div
      className={clsx(
        'file-upload',
        { 'active': isAcvite }
      )}
      onDrop={handleOnDrop}
      onDragLeave={handleOnDragLeave}
      onDragOver={handleOnDragOver}
      onClick={handleOnClick}
      draggable="true"
    >
      <div className="file-upload-container">
        <input
          type="file"
          id='file-image-upload'
          accept='image/*'
          className='d-none'
          onChange={handleOnChange}
          ref={inputRef}
        />
        <img src={placeholder} width='46' height='54' className="file-upload-placeholder" alt="placeholder" />
        <div className="file-upload-content">
          <div className="file-upload-title">Letakkan gambar anda disini</div>
          <div className="file-upload-support">Mendukung : JPG, JPEG, PNG</div>
        </div>
      </div>
    </div>
  )
}