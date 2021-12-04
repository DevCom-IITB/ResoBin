import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

const initSentry = () => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 1.0,
    })
  }
}

export default initSentry
