const colorPicker = (num) => {
  switch (num) {
    case 0:
      return 'linear-gradient(to right, #7e7c00, #fffc00)'
    case 1:
      return 'linear-gradient(to right, #00b09b, #96c93d)'
    case 2:
      return 'linear-gradient(to right, #000428, #004e92)'
    case 3:
      return 'linear-gradient(to right, #cb356b, #bd3f32)'
    case 4:
      return 'linear-gradient(to right, #f2994a, #f2c94c)'
    case 5:
      return 'linear-gradient(to right, #36d1dc, #5b86e5)'
    case 6:
      return 'linear-gradient(to right, #834d9b, #d04ed6)'
    default:
      return 'linear-gradient(to right, #666666, #aaaaaa)'
  }
}

export default colorPicker
