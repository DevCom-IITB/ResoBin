import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'

import { Header } from 'components/header'
import { LoaderAnimation } from 'components/shared'
import { AppRoutes } from 'routes'
import { persistor } from 'store'
import { selectTheme } from 'store/settingsSlice'
import { themes, GlobalStyles } from 'styles'

const App = () => {
  toast.configure()
  const selectedTheme = useSelector(selectTheme)

  return (
    <ThemeProvider theme={themes[selectedTheme]}>
      <PersistGate loading={<LoaderAnimation />} persistor={persistor}>
        <Suspense fallback={<LoaderAnimation />}>
          <Helmet>
            <title>ResoBin</title>
            <meta
              name="description"
              content="IIT Bombay's resources sharing website"
            />
          </Helmet>
          <GlobalStyles />

          <Header />
          <AppRoutes />
        </Suspense>
      </PersistGate>
    </ThemeProvider>
  )
}

export default App
