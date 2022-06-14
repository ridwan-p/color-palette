import { useEffect, useRef, useState } from "react"
import { ic_upload } from "assets"
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
import { Vector } from "models/KmeansModel"
import app from "config/app"
import { colorName } from "helpers/colors"
import { ImageItems, VectorPalette, MetrixPalette } from "models/PaletteModel"

import styles from "./Home.module.scss"

export const Home = () => {
  const [status, setStatus] = useState(ProgressStatus.Idle)
  const [imagesSrc, setImagesSrc] = useState<ImageItems>([])
  const [palettes, setPalettes] = useState<MetrixPalette>([])

  useEffect(() => {
    const dataLocal = localStorage.getItem(app.palettes)
    if (dataLocal) {
      const data = JSON.parse(dataLocal)
      setImagesSrc(data?.imagesSrc)
      setPalettes(data?.palettes)
    }
  }, [])

  const saveLocalStorage = (imagesSrc: ImageItems, palettes: MetrixPalette) => {
    const data = { imagesSrc, palettes }
    localStorage.setItem(app.palettes, JSON.stringify(data))
  }

  const getColor = (data: Vector[]): VectorPalette => {
    return data.map((item) => {
      const rgb = { r: item[0], g: item[1], b: item[2] }
      const name = colorName(rgb)
      const hex = rgba2hex(rgb)
      return { hex, name }
    })
  }

  const handleOnUpload = async (file: File) => {
    setStatus(ProgressStatus.Loading)
    const src = URL.createObjectURL(file)
    const { data, base64 } = await loadImage(src, 500)
    kmeansCalcuation(data).then((data: Vector[]) => {
      const colors = getColor(data)
      palettes.push(colors)
      setPalettes(palettes)
      imagesSrc.push({ src: base64, filename: file.name })
      setImagesSrc(imagesSrc)
      setStatus(ProgressStatus.Finish)
      // save to localStorage
      saveLocalStorage(imagesSrc, palettes)
    })

  }

  const handleChange = async (key: number, file: File) => {
    setStatus(ProgressStatus.Loading)
    const src = URL.createObjectURL(file)
    const { data, base64 } = await loadImage(src, 500)

    kmeansCalcuation(data).then((data: Vector[]) => {
      palettes[key] = getColor(data)
      setPalettes(palettes)

      imagesSrc[key] = { src: base64, filename: file.name }
      setImagesSrc(imagesSrc)

      setStatus(ProgressStatus.Finish)
      // save to localStorage
      saveLocalStorage(imagesSrc, palettes)
    })
  }

  const handleRemove = (key: number) => {
    imagesSrc.splice(key, 1)
    palettes.splice(key, 1)
    setPalettes([...palettes])
    setImagesSrc([...imagesSrc])

    // save to localStorage
    saveLocalStorage(imagesSrc, palettes)
  }

  const handleOnFinishProcess = () => {
    setTimeout(() => {
      setStatus(ProgressStatus.Idle)
    }, 1200)
  }

  const kmeansCalcuation = async (src: ImageData): Promise<Vector[]> => {
    const rgba = convertImageRGB(src)
    // kmeans init 
    const kmeans = new Kmeans(rgba, 6)
    // kmeans calculate 
    return kmeans.run()
  }

  if (palettes.length <= 0 && imagesSrc.length <= 0) {
    return (
      <EmptyValue
        onUpload={handleOnUpload}
        status={status}
        onFinishProcess={handleOnFinishProcess}
      />
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
      onFinishProcess={handleOnFinishProcess}
    />
  )

}

type PropsEmpty = {
  onUpload(file: File): void
  status: ProgressStatus
  onFinishProcess(): void
}

const EmptyValue: React.FC<PropsEmpty> = ({
  onUpload,
  onFinishProcess,
  status
}) => {

  return (
    <div className={styles['empty-value']}>
      <FileUpload onChange={onUpload} />
      {
        status !== ProgressStatus.Idle && (
          <ProgressBar
            status={status}
            onFinish={onFinishProcess}
          />
        )
      }
    </div>
  )
}

type PropsItems = {
  palettes: MetrixPalette,
  imagesSrc: ImageItems
  status: ProgressStatus
  onRemove(key: number): void
  onChange(key: number, file: File): void
  onFinishProcess(): void
  onUpload(file: File): void
}

const ItemsPalette: React.FC<PropsItems> = ({
  palettes,
  imagesSrc,
  status,
  onRemove,
  onChange,
  onUpload,
  onFinishProcess
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
        {
          status !== ProgressStatus.Idle && (
            <ProgressBar
              status={status}
              onFinish={onFinishProcess}
            />
          )
        }
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
