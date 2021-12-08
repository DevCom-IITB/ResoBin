import { adjustHue } from 'polished'

export const makeGradient = (color) =>
  `linear-gradient(135deg, ${color}, ${adjustHue(40, color)})`

// ? standard paint palette row 2
export const palette = [
  '#FF6766',
  '#FF9968',
  '#FFCC66',
  '#FFFF67',
  '#CDFE67',
  '#9BFE66',
  '#66FF66',
  '#68FE9A',
  '#66FECB',
  '#66FEFF',
  '#66CBFF',
  '#6599FF',
  '#6867FF',
  '#9A67FF',
  '#CC68FF',
  '#FF67FF',
  '#FE66CB',
  '#FF669A',
]

export const colorPicker = (id) => palette[id % palette.length]
