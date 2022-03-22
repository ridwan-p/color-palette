import React, { useState } from 'react'
import clsx from 'clsx'
import { ImagePalette } from './ImagePalette'
import { convertImageRGB, loadImage, readImage, rgba2hex } from '../../helpers/image-generate'
import { Kmeans } from '../../helpers/kmeans'

type Props = {
  className?: string
  colors: string[]
}
const defaultImage = 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
const defaultColor = ['#d8b499', '#ae7e5b', '#795032', '#453321', '#21180e', '#070703']
export const ImageUpload: React.FC<Props> = ({
  className
}) => {
  const [urlImage, setUrlImage] = useState<string>(defaultImage)
  const [palette, setPalette] = useState<string[]>(defaultColor)
  const [isLoading, setLoading] = useState<boolean>(false)

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const src = URL.createObjectURL(files[0])
      setLoading(true)
      loadImage(src).then((data) => {
        const rgba = convertImageRGB(data)
        const kmeans = new Kmeans(rgba, 6)
        const calculate = kmeans.calculate()
        const colors = calculate.map((item) => rgba2hex({ r: item[0], g: item[1], b: item[2] }))
        setPalette(colors)
        setUrlImage(src)
        setLoading(false)
      })
    }
  }

  return (
    <div className={clsx('row align-items-center', className)}>
      <div className="col-lg-6">
        <h4>What is Lorem Ipsum?</h4>
        <p className='py-3'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        <label htmlFor='file-image-upload' className="btn btn-primary text-brown-3 px-5">Upload Image</label>
        <input
          type="file"
          id='file-image-upload'
          accept='image/*'
          className='d-none'
          onChange={handleChangeFile}
        />
      </div>
      <div className="col-lg-6 text-center">
        {
          isLoading ? "Loading" : <ImagePalette urlImage={urlImage} colors={palette} />
        }
      </div>
    </div>
  )
}