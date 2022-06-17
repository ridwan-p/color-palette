/* eslint-disable no-mixed-operators */
import { ColorModelHSL, ColorModelHSV, ColorModelRGB } from "models/Colors"
import dataColors from 'config/colors'
/**
 * https://stackoverflow.com/questions/35969656/how-can-i-generate-the-opposite-color-according-to-current-color
 * 
 * @param hex 
 * @param bw 
 * @returns 
 */
export function invertColor(hex: string, bw: boolean = false) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1)
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.')
  }
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  if (bw) {
    // https://stackoverflow.com/a/3943023/112731
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186
      ? '#000000'
      : '#FFFFFF'
  }
  // invert color components
  const rStr = (255 - r).toString(16)
  const gStr = (255 - g).toString(16)
  const bStr = (255 - b).toString(16)
  // pad each with zeros and return
  return "#" + padZero(rStr) + padZero(gStr) + padZero(bStr)
}

function padZero(str: string, len: number = 2) {
  var zeros = new Array(len).join('0')
  return (zeros + str).slice(-len)
}

export const colorDistance = (col1: ColorModelRGB, col2: ColorModelRGB) => {
  const r = col1.r - col2.r
  const g = col1.g - col2.g
  const b = col1.b - col2.b

  return Math.pow(r, 2) + Math.pow(g, 2) + Math.pow(b, 2)
}

export const colorName = (rgb: ColorModelRGB): string => {
  const colors = dataColors
  // init params 
  let closest = colors[0]
  let mindist = colorDistance(rgb, colors[0])
  // find color name 
  for (let i = 1; i < colors.length; i++) {
    const color2 = colors[i]
    const dist = colorDistance(rgb, color2)
    if (dist < mindist) {
      mindist = dist
      closest = color2
    }
  }
  return closest.name || ''
}

export const clearHex = (hex: string): string => {
  if (hex[0] === '#') return hex.replace('#', '')
  return hex
}

export const hex3To6 = (hex: string) => {
  hex = clearHex(hex)
  return hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
}

export const rgb2hex = ({ r, g, b }: ColorModelRGB): string => {
  const red = (r | 1 << 8).toString(16).slice(1)
  const green = (g | 1 << 8).toString(16).slice(1)
  const blue = (b | 1 << 8).toString(16).slice(1)
  return '#' + red + green + blue
}

// https://stackoverflow.com/questions/21646738/convert-hex-to-rgba
export const hex2RGB = (hex: string): ColorModelRGB => {
  hex = clearHex(hex)
  if (hex.length === 3) hex = hex3To6(hex)

  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  return { r, g, b }
}

// https://stackoverflow.com/questions/46432335/hex-to-hsl-convert-javascript
export const rgb2HSL = ({ r, g, b }: ColorModelRGB): ColorModelHSL => {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const dist = (max + min) / 2
  let h = dist
  let s = dist
  let l = dist

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g: h = (b - r) / d + 2
        break
      case b: h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  h = Math.floor(h * 360)
  s = Math.floor(s * 360)
  l = Math.floor(l * 360)
  return { h, s, l }
}

export const hex2HSL = (hex: string): ColorModelHSL => {
  const rgb = hex2RGB(hex)
  return rgb2HSL(rgb)
}


const percentRoundFn = (num: number) => Math.round(num * 100) / 100;
const diffc = (c: number, v: number, diff: number) => (v - c) / 6 / diff + 1 / 2;
// https://stackoverflow.com/questions/8022885/rgb-to-hsv-color-in-javascript
export const rgb2HSV = ({ r, g, b }: ColorModelRGB): ColorModelHSV => {
  const rabs = r / 255;
  const gabs = g / 255;
  const babs = b / 255;
  const v = Math.max(rabs, gabs, babs)
  const diff = v - Math.min(rabs, gabs, babs)
  let h = 0
  let s = 0
  if (diff !== 0) {
    s = diff / v;
    const rr = diffc(rabs, v, diff);
    const gg = diffc(gabs, v, diff);
    const bb = diffc(babs, v, diff);

    if (rabs === v) {
      h = bb - gg;
    } else if (gabs === v) {
      h = (1 / 3) + rr - bb;
    } else if (babs === v) {
      h = (2 / 3) + gg - rr;
    }
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }

  return {
    h: Math.round(h * 360),
    s: percentRoundFn(s * 100),
    v: percentRoundFn(v * 100)
  };
}

export const hex2HSV = (hex: string) => {
  const rgb = hex2RGB(hex)
  return rgb2HSV(rgb)
}