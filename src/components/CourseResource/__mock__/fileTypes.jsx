// ? acceptable file types
export const fileTypes = [
  {
    type: 'application/pdf',
    extention: 'pdf',
    icon: 'https://image.flaticon.com/icons/svg/179/179483.svg',
  },
  {
    type: 'application/msword',
    extention: 'doc',
    icon: 'https://image.flaticon.com/icons/svg/281/281760.svg',
  },
  {
    type: 'application/rtf',
    extention: 'rtf',
    icon: 'https://image.flaticon.com/icons/svg/136/136539.svg',
  },
  {
    type: 'image/png',
    extention: 'png',
    icon: 'https://image.flaticon.com/icons/svg/136/136523.svg',
  },
  {
    type: 'image/jpeg',
    extention: 'jpg',
    icon: 'https://image.flaticon.com/icons/svg/136/136524.svg',
  },
  {
    type: 'image/jpeg',
    extention: 'jpeg',
    icon: 'https://image.flaticon.com/icons/svg/136/136524.svg',
  },
  {
    type: 'text/plain',
    extention: 'txt',
    icon: 'https://image.flaticon.com/icons/svg/136/136538.svg',
  },
]

export const defaultFileType = {
  type: null,
  extention: null,
  icon: 'https://image.flaticon.com/icons/svg/136/136549.svg',
}

export const getFileDetails = (file) => {
  if (!file) return defaultFileType

  const { name, type } = file
  const extention = name.split('.').pop()
  const { icon } =
    fileTypes.find((fileType) => fileType.type === type) || defaultFileType

  return {
    type,
    extention,
    icon,
  }
}

export default fileTypes
