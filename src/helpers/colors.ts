/**
 * https://stackoverflow.com/questions/35969656/how-can-i-generate-the-opposite-color-according-to-current-color
 * 
 * @param hex 
 * @param bw 
 * @returns 
 */
export function invertColor(hex: string, bw: boolean = false) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  if (bw) {
    // https://stackoverflow.com/a/3943023/112731
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186
      ? '#000000'
      : '#FFFFFF';
  }
  // invert color components
  const rStr = (255 - r).toString(16);
  const gStr = (255 - g).toString(16);
  const bStr = (255 - b).toString(16);
  // pad each with zeros and return
  return "#" + padZero(rStr) + padZero(gStr) + padZero(bStr);
}

function padZero(str: string, len: number = 2) {
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}