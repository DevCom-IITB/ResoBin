import { Button, Switch } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { Aside, CardSplit, Form, toast, Typography } from 'components/shared'
import { PageHeading, PageTitle } from 'components/shared/Layout'
import { logoutAction } from 'store/authSlice'
import { selectSettings, setTracking } from 'store/settingsSlice'

import Profile from './Profile'

const SettingsContainer = () => {
  const dispatch = useDispatch()
  const settings = useSelector(selectSettings)
  const [form] = Form.useForm()

  const handleSettingsChange = (values) => {
    if (values.tracking !== undefined) dispatch(setTracking(values.tracking))
  }

  const handleLogout = async () => {
    try {
      const response = await dispatch(logoutAction())
      toast({ status: 'success', content: response?.payload?.detail })
    } catch (error) {
      toast({ status: 'error', content: error })
    }
  }

  return (
    <>
      <PageHeading>
        <PageTitle>Settings</PageTitle>
      </PageHeading>

      <Form
        form={form}
        name="settings"
        layout="vertical"
        onValuesChange={handleSettingsChange}
        initialValues={settings}
      >

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
          sub={
            <Form.Item name="tracking" valuePropName="checked">
              <Switch />
            </Form.Item>
          }
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
      </Form>

      <Aside
        title="Profile"
        subtitle={
          <Typography.Link href="https://gymkhana.iitb.ac.in/profiles/user/">
            Modify
          </Typography.Link>
        }
      >
        <Profile />
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
  margin-top: 0.5rem;
  margin-bottom: 0;
  color: ${({ theme }) => theme.textColorInactive};
  font-size: 0.875rem;
`

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.75rem;
  font-weight: 500;
  font-size: 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius};
`
