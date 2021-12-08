import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

const initSentry = () => {
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.REACT_APP_SENTRY_DSN
  ) {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      autoSessionTracking: false,
      environment: process.env.NODE_ENV,
      release: `${process.env.REACT_APP_NAME}@${process.env.npm_package_version}`,
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 0.1,
    })
  }
}

export default initSentry
