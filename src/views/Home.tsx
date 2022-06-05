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
import { Kmeans, Vector } from "helpers/kmeans"
import { ImageItems, PaletteItems } from "models/PaletteModel"

import styles from "./Home.module.scss"



export const Home = () => {
  const [status, setStatus] = useState(ProgressStatus.Idle)
  const [imagesSrc, setImagesSrc] = useState<ImageItems>([])
  const [palettes, setPalettes] = useState<PaletteItems>([])


  const handleOnUpload = (file: File) => {
    setStatus(ProgressStatus.Loading)
    const src = URL.createObjectURL(file)

    calculate(src).then((data: Vector[]) => {
      const colors = data.map((item) => rgba2hex({ r: item[0], g: item[1], b: item[2] }))
      palettes.push(colors)
      setPalettes(palettes)
      imagesSrc.push({ src, filename: file.name })
      setImagesSrc(imagesSrc)
      setStatus(ProgressStatus.Finish)
    })
  }

  const handleChange = (key: number, file: File) => {
    setStatus(ProgressStatus.Loading)
    const src = URL.createObjectURL(file)

    calculate(src).then((data: Vector[]) => {
      palettes[key] = data.map((item) => rgba2hex({ r: item[0], g: item[1], b: item[2] }))
      setPalettes(palettes)

      imagesSrc[key] = { src, filename: file.name }
      setImagesSrc(imagesSrc)

      setStatus(ProgressStatus.Finish)
    })
  }

  const handleRemove = (key: number) => {
    imagesSrc.splice(key, 1)
    palettes.splice(key, 1)
    setPalettes([...palettes])
    setImagesSrc([...imagesSrc])
  }

  const calculate = async (src: string): Promise<Vector[]> => {
    const img = await loadImage(src)
    const rgba = convertImageRGB(img)
    // kmeans init 
    const kmeans = new Kmeans(rgba, 6)
    // kmeans calculate 
    return await kmeans.run()
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
      onChange={handleChange}
      onRemove={handleRemove}
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
  onRemove(key: number): void
  onChange(key: number, file: File): void
  onUpload(file: File): void
}

const ItemsPalette: React.FC<PropsItems> = ({
  palettes,
  imagesSrc,
  status,
  onRemove,
  onChange,
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
              onChange={(file) => { onChange(key, file) }}
              onRemove={() => { onRemove(key) }}
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
