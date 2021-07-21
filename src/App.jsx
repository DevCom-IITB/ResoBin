import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { ThemeProvider } from 'styled-components'

import { Header } from 'components/header'
import { LoaderAnimation } from 'components/shared'
import { AppRoutes } from 'routes'
import { selectTheme } from 'store/settingsSlice'
import { DarkTheme, GlobalStyles, LightTheme } from 'styles'

const App = () => {
  toast.configure()
  const theme = useSelector(selectTheme)

  return (
    <ThemeProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>
      <Helmet>
        <title>ResoBin</title>
        <meta
          name="description"
          content="IIT Bombay's course resources sharing website"
        />
      </Helmet>
      <GlobalStyles />

      <Header />
      <Suspense fallback={<LoaderAnimation />}>
        <AppRoutes />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
