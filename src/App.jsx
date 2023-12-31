import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components/macro'

import PopupModal from 'components/Popup/PopupModal'
import { LoaderAnimation } from 'components/shared'
// import { usePageTracking } from 'hooks'
import { AppRoutes } from 'routes'
import { selectAuthLoading } from 'store/authSlice'
import { selectTheme } from 'store/settingsSlice'
import { themes, GlobalStyles } from 'styles'

// ? for viewing course resource pdfs
// import worker from 'pdfjs-dist/build/pdf.worker.entry'
// import { pdfjs } from 'react-pdf'
// pdfjs.GlobalWorkerOptions.workerSrc = worker

const App = () => {
  const theme = useSelector(selectTheme)
  const authLoading = useSelector(selectAuthLoading)
  // usePageTracking()

  return (
    <ThemeProvider theme={themes[theme] ?? themes.dark}>
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
        <PopupModal />
        <AppRoutes />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
