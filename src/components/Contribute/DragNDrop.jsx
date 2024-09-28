import { CloudUpload } from '@styled-icons/heroicons-outline'
import { lighten, rgba } from 'polished'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components/macro'

import { device, fontSize } from 'styles/responsive'

import { fileTypes } from './fileDetails'

const dropzoneProps = {
  accept: fileTypes.map((file) => file.type),
  maxSize: 30 * 1024 * 1024, // ? 30MB
  minSize: 3 * 1024, // ? 3KB
}

export const DragNDropSub = ({ onDrop, children }) => {
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({ maxFiles: 1, onDrop, ...dropzoneProps })

  let message = children
  if (isDragActive) {
    if (isDragReject) message = <h2>File too large or invalid upload format</h2>
    else message = <h2>Drop files here</h2>
  }

  return (
    <UploadBoxSub {...getRootProps()} error={isDragReject}>
      <input {...getInputProps()} />

      {message}
    </UploadBoxSub>
  )
}

const DragNDrop = ({ onDrop, children }) => {
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({ onDrop, ...dropzoneProps })

  let message = null
  if (!isDragActive)
    message = (
      <h2>
        Drag & drop to upload
        <br />
        or click to browse files
      </h2>
    )
  else if (isDragReject) message = <h2>Invalid upload format</h2>
  else message = <h2>Drop files here</h2>

  return (
    <UploadBox {...getRootProps()} error={isDragReject}>
      <input {...getInputProps()} />
      <CloudUpload size="60" />
      {message}
      <span>
        Accepted formats: .pdf, .doc, .ppt, .zip
        <br />
        Maximum upload file size: 30MB
      </span>
    </UploadBox>
  )
}

export default DragNDrop

const UploadBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 16rem;
  margin-bottom: 1rem;
  padding: 3rem 1rem;
  color: ${({ theme, error }) => (error ? '#f34a4a' : theme.textColorInactive)};
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  outline: 3px dashed ${({ theme }) => rgba(theme.textColorInactive, 0.4)};
  outline-offset: -0.75rem;
  cursor: pointer;

  h2 {
    font-size: ${fontSize.responsive.md};
  }

  &:hover {
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => lighten(0.1, theme.secondary)};
    outline-color: ${({ theme }) => theme.textColorInactive};
  }
`

const UploadBoxSub = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  width: 15rem;
  height: initial;
  padding: 1.5rem 1rem;
  color: ${({ theme, error }) => (error ? '#f34a4a' : theme.textColorInactive)};
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  outline: 3px dashed ${({ theme }) => rgba(theme.textColorInactive, 0.4)};
  outline-offset: -0.75rem;
  cursor: pointer;

  h2 {
    font-size: ${fontSize.static.xs};
    text-align: center;
  }

  &:hover {
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => lighten(0.1, theme.secondary)};
    outline-color: ${({ theme }) => theme.textColorInactive};
  }

  @media ${device.max.xs} {
    width: 100%;
    height: 11rem;
    padding: 1rem;
  }
`
