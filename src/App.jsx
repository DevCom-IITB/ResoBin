import worker from 'pdfjs-dist/build/pdf.worker.entry'
import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { pdfjs } from 'react-pdf'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components/macro'

import { Header } from 'components/header'
import { LoaderAnimation } from 'components/shared'
import { AppRoutes } from 'routes'
import { persistor } from 'store'
import { selectTheme } from 'store/settingsSlice'
import { themes, GlobalStyles } from 'styles'

// ? for viewing course resource pdfs
pdfjs.GlobalWorkerOptions.workerSrc = worker

const App = () => {
  toast.configure()
  const selectedTheme = useSelector(selectTheme)

  return (
    <ThemeProvider theme={themes[selectedTheme]}>
      <PersistGate loading={<LoaderAnimation fixed />} persistor={persistor}>
        <Helmet>
          <title>ResoBin</title>
          <meta
            name="description"
            content="IIT Bombay's resources sharing website"
          />
        </Helmet>
        <GlobalStyles />

        <Header />
        <Suspense fallback={<LoaderAnimation fixed />}>
          <AppRoutes />
        </Suspense>
      </PersistGate>
    </ThemeProvider>
  )
}

export default App
