// similar to reselect's nest function
import { nest } from 'helpers'

import ViewportContextProvider from './ViewportContext'

const providers = [ViewportContextProvider]

const ContextProvider = nest(...providers)

export default ContextProvider
