import ThemeContextProvider from 'context/ThemeContext'
import ViewportContextProvider from 'context/ViewportContext'

const CombineContexts = (...components) => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }) => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        )
      }
    },
    ({ children }) => <>{children}</>
  )
}

const providers = [ThemeContextProvider, ViewportContextProvider]

const ContextProvider = CombineContexts(...providers)

export default ContextProvider
