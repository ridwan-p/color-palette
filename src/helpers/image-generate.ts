import { ImageGenerator } from "models/ImageModel"

/* eslint-disable no-mixed-operators */
export const getRGB = (imageData: ImageData, index: number) => {
  const i = index * 4
  const d = imageData.data
  // return [d[i], d[i + 1], d[i + 2], d[i + 3]]
  return [d[i], d[i + 1], d[i + 2]]
}

export const getPixel = (imageData: ImageData, x: number, y: number) => getRGB(imageData, y * imageData.width + x)

export const convertImageRGB = (imageData: ImageData) => {
  const rgba = []
  const length = imageData.data.length / 4
  for (let i = 0; i < length; i++) {
    rgba.push(getRGB(imageData, i))
  }

  return rgba
}

type RGBA = {
  r: number
  g: number
  b: number
  // a: number
}
export const rgba2hex = ({ r, g, b }: RGBA): string => {
  const red = (r | 1 << 8).toString(16).slice(1)
  const green = (g | 1 << 8).toString(16).slice(1)
  const blue = (b | 1 << 8).toString(16).slice(1)
  return '#' + red + green + blue
}

export async function loadImage(url: string, resize: number = 700) {
  const image = new Image()
  return new Promise<ImageGenerator>((resolve, reject) => {
    image.onload = () => {
      const cvs = document.createElement('canvas')
      const ctx = cvs.getContext("2d") as CanvasRenderingContext2D
      const scala = image.width > resize ? resize / image.width : 1
      cvs.width = image.width * scala
      cvs.height = image.height * scala
      ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, cvs.width, cvs.height)
      const data = ctx.getImageData(0, 0, cvs.width, cvs.height)
      const base64 = cvs.toDataURL("image/png")
      return resolve({ data, base64 })
    }
    image.onerror = reject;
    image.src = url;
  });
}

export const readImage = (src: string) => {
  const cvs = document.createElement('canvas')
  const ctx = cvs.getContext("2d") as CanvasRenderingContext2D
  const image = new Image()
  image.onload = function () {
    ctx.drawImage(image, 0, 0)
  }
  image.src = src
  cvs.width = image.width
  cvs.height = image.height
  const data = ctx.getImageData(0, 0, cvs.width, cvs.height)
  const pexels = getPixel(data, 0, 0)
  console.log('pexels', pexels)
}