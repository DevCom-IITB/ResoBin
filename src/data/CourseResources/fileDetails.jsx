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

export const defaultFile = {
  name: 'Upload document',
  type: null,
  extention: null,
  icon: 'https://image.flaticon.com/icons/svg/136/136549.svg',
  isValid: false,
  size: null,
}

const printSize = (_size) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  let i = 0
  let size = _size

  while (size > 900) {
    size /= 1024
    i += 1
  }

  return `${Math.round(size * 100) / 100} ${sizes[i]}`
}

export const getFileDetails = (file) => {
  if (!file) return defaultFile
  const { name, type } = file
  const fileType = fileTypes.find((item) => item.type === type)
  if (!fileType) return { ...defaultFile, name }

  return {
    name,
    type,
    extention: name.split('.').pop().toLowerCase(),
    icon: fileType.icon,
    isValid: true,
    size: printSize(file.size),
  }
}