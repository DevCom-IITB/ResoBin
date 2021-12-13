import { Sun, Moon } from '@styled-icons/heroicons-outline/'
import { Button, Empty } from 'antd'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/macro'

import {
  Aside,
  CardSplit,
  Switch,
  Typography,
  PageSubtitle,
} from 'components/shared'
import { PageHeading, PageTitle } from 'components/shared/Layout'
import { useTheme } from 'hooks'
import { logoutAction } from 'store/authSlice'

import Profile from './Profile'

const SettingsContainer = () => {
  const dispatch = useDispatch()
  const { theme, switchTheme } = useTheme()

  const handleLogout = () => dispatch(logoutAction())

  return (
    <>
      <PageHeading>
        <PageTitle>Settings</PageTitle>
      </PageHeading>

      <SettingCards>
        <CardSplit
          main={<Heading>Dark mode</Heading>}
          sub={
            <Switch
              checkedChildren={<Moon size="18" />}
              unCheckedChildren={<Sun size="18" />}
              defaultChecked={theme === 'dark'}
              onChange={switchTheme}
            />
          }
          subWidth="5rem"
        />

        <CardSplit
          main={
            <>
              <Heading>Privacy</Heading>
              <SubHeading>
                We collect anonymous, aggregated usage information on ResoBin -
                think of it as a survey to tells us which browsers to support
                and what features are popular. We do not use this information
                for advertising, or share this information with anybody.
                <br />
                If you opt out, we could end up removing features that you use
                since we wont know if anyone is using them.
              </SubHeading>
            </>
          }
          sub={<Switch defaultChecked />}
          subWidth="5rem"
        />

        <CardSplit
          main={<Heading>Account</Heading>}
          sub={
            <StyledButton type="primary" danger onClick={handleLogout}>
              Logout
            </StyledButton>
          }
          subWidth="5rem"
        />
      </SettingCards>

      <Aside
        title="Profile"
        subtitle={
          <Typography.Link href="https://gymkhana.iitb.ac.in/profiles/user/">
            Modify
          </Typography.Link>
        }
      >
        {/* <Empty description={<PageSubtitle>Coming soon!</PageSubtitle>} /> */}
        <Profile/>
      </Aside>
    </>
  )
}

export default SettingsContainer

const Heading = styled.h1`
  color: ${({ theme }) => theme.textColor};
  font-weight: 600;
  font-size: 1.125rem;
`

const SubHeading = styled.p`
  color: ${({ theme }) => theme.textColorInactive};
  font-size: 0.875rem;
  margin-top: 0.5rem;
  margin-bottom: 0;
`

const StyledButton = styled(Button)`
  height: 2.25rem;
  font-weight: 500;
  font-size: 1rem;
  border-radius: 0.5rem;
`

const SettingCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
