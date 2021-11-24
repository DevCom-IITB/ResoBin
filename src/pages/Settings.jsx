import { Helmet } from 'react-helmet-async'

import { SettingsContainer } from 'components/settings'
import { PageContainer } from 'components/shared'

const Settings = () => {
  return (
    <PageContainer>
      <Helmet>
        <title>Settings - ResoBin</title>
        <meta name="description" content="User's settings" />
      </Helmet>

      <SettingsContainer />
    </PageContainer>
  )
}

export default Settings
