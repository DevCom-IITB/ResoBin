import { useState } from 'react'
import { Document, Page } from 'react-pdf'

const PDFViewer = ({ file }) => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber] = useState(1)

  const onDocumentLoadSuccess = ({ numPages: num }) => {
    setNumPages(num)
  }

  return (
    <div>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={console.error}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  )
}

export default PDFViewer
