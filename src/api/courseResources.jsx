import API from './api-config'

export const courseResourceUpload = (formData, onUploadProgress) => {
  return API.post('/api/resources/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  })
}

export const courseResourceGetAll = () => {
  return API.get('/files')
}
