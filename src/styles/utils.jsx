import { adjustHue } from 'polished'

export const makeGradient = (color) => {
  return `linear-gradient(135deg, ${color}, ${adjustHue(40, color)})`
}

export const colorPicker = (id) => {
  switch (id % 8) {
    case 0:
      return '#f1fa8c'
    case 1:
      return '#8be9fd'
    case 2:
      return '#ff79c6'
    case 3:
      return '#bd93f9'
    case 4:
      return '#ffb86c'
    case 5:
      return '#ff5555'
    case 6:
      return '#50fa7b'
    case 7:
      return '#6877fa'
    default:
      return '#6272a4'
  }
}

export const antdColorPicker = (id) => {
  switch (id % 11) {
    case 0:
      return 'magenta'
    case 1:
      return 'red'
    case 2:
      return 'volcano'
    case 3:
      return 'orange'
    case 4:
      return 'gold'
    case 5:
      return 'lime'
    case 6:
      return 'green'
    case 7:
      return 'cyan'
    case 8:
      return 'blue'
    case 9:
      return 'geekblue'
    case 10:
      return 'purple'
    default:
      return 'default'
  }
}

export default colorPicker
