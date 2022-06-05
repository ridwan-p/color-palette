import { useEffect, useRef, useState } from "react"
import { ic_upload } from "assets"
import clsx from "clsx"
import {
  ButtonIcon,
  FileUpload,
  ImagePalette,
  ItemUpload,
  ProgressBar,
  Status as ProgressStatus
} from "components"
import { convertImageRGB, loadImage, rgba2hex } from "helpers/image-generate"
import { Kmeans } from "helpers/kmeans"
import { ImageItems, PaletteItems } from "models/PaletteModel"

import styles from "./Home.module.scss"



export const Home = () => {
  const [status, setStatus] = useState(ProgressStatus.Idle)
  const [imagesSrc, setImagesSrc] = useState<ImageItems>([])
  const [palettes, setPalettes] = useState<PaletteItems>([])


  const handleOnUpload = (file: File) => {
    setStatus(ProgressStatus.Loading)
    calculate(file)
  }

  const calculate = async (file: File) => {
    const src = URL.createObjectURL(file)
    const img = await loadImage(src)
    const rgba = convertImageRGB(img)
    // kmeans calculate 
    const kmeans = new Kmeans(rgba, 6)
    const calculate = await kmeans.run()
    // finish 

    const colors = calculate.map((item) => rgba2hex({ r: item[0], g: item[1], b: item[2] }))
    palettes.push(colors)
    setPalettes(palettes)
    imagesSrc.push({ src, filename: file.name })
    setImagesSrc(imagesSrc)
    setStatus(ProgressStatus.Finish)
  }

  if (palettes.length <= 0 && imagesSrc.length <= 0) {
    return (
      <EmptyValue onUpload={handleOnUpload} status={status} />
    )
  }

  return (
    <ItemsPalette
      status={status}
      palettes={palettes}
      imagesSrc={imagesSrc}
      onUpload={handleOnUpload}
    />
  )

}

type PropsEmpty = {
  onUpload(file: File): void,
  status: ProgressStatus
}

const EmptyValue: React.FC<PropsEmpty> = ({
  onUpload,
  status
}) => {

  return (
    <div className={styles['empty-value']}>
      <FileUpload onChange={onUpload} />
      {status !== ProgressStatus.Idle && <ProgressBar status={status} />}
    </div>
  )
}

type PropsItems = {
  palettes: PaletteItems,
  imagesSrc: ImageItems
  status: ProgressStatus
  onUpload(file: File): void
}

const ItemsPalette: React.FC<PropsItems> = ({
  palettes,
  imagesSrc,
  status,
  onUpload
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const files = e.target.files
    if (files?.[0]) {
      onUpload(files[0])
    }
  }

  const handleCickUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <div className={styles['items-palette']}>
      <div className={styles['items-palette-file']}>
        {
          imagesSrc.map((item, key) => (
            <ItemUpload
              key={key}
              filename={item.filename}
              onChange={(file) => { console.log('file', file) }}
              onRemove={() => { console.log('remove file') }}
            />
          ))
        }
        {status !== ProgressStatus.Idle && <ProgressBar status={status} />}
      </div>

      <ButtonIcon
        iconPre={ic_upload}
        onClick={handleCickUpload}
        className='btn-primary'
        style={{ minWidth: '262px' }}
      >
        Unggah Gambar
      </ButtonIcon>
      <input
        type="file"
        id='file-image-upload'
        accept='image/*'
        className='d-none'
        onChange={handleUpload}
        ref={inputRef}
      />

      <div className={styles['items-palette-content']}>
        {
          palettes.map((colors, key) => (
            <ImagePalette
              key={key}
              colors={colors}
              src={imagesSrc[key].src}
            />
          ))
        }
      </div>
    </div>
  )
}
