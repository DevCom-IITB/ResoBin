import { useState } from 'react'
import { Document, Page } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'

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
        {/* <Page pageNumber={pageNumber} /> */}
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  )
}

export default PDFViewer
