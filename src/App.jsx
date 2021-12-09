// import worker from 'pdfjs-dist/build/pdf.worker.entry'
import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
// import { pdfjs } from 'react-pdf'
import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components/macro'

import { LoaderAnimation } from 'components/shared'
import { AppRoutes } from 'routes'
import { selectAuthLoading } from 'store/authSlice'
import { selectTheme } from 'store/settingsSlice'
import { themes, GlobalStyles } from 'styles'

// ? for viewing course resource pdfs
// pdfjs.GlobalWorkerOptions.workerSrc = worker

const App = () => {
  const selectedTheme = useSelector(selectTheme)
  const authLoading = useSelector(selectAuthLoading)

  return (
    <ThemeProvider theme={themes[selectedTheme]}>
      <Helmet>
        <title>ResoBin</title>
        <meta
          name="description"
          content="IIT Bombay's resources sharing website"
        />
      </Helmet>
      <GlobalStyles />
      <LoaderAnimation fixed disable={!authLoading} />

      <Suspense fallback={<LoaderAnimation fixed />}>
        <AppRoutes />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
