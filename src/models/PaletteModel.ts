
export type ImageItem = {
    src: string
    filename: string
}
export type ImageItems = ImageItem[]

export type PaletteColor = {
    name: string
    hex: string
}

export type VectorPalette = PaletteColor[]
export type MetrixPalette = VectorPalette[]