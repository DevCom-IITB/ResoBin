import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/macro'

import { DarkmodeToggle } from 'components/settings'
import { logoutAction } from 'store/authSlice'

const SettingsContainer = () => {
  const dispatch = useDispatch()
  const handleLogout = () => dispatch(logoutAction())

  return (
    <div>
      <h1>Switch theme</h1>
      <DarkmodeToggle />

      <h1>Are you sure you want to logout?</h1>
      <StyledButton type="primary" onClick={handleLogout}>
        Logout
      </StyledButton>
    </div>
  )
}

export default SettingsContainer

const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.25rem;
  margin: 1.5rem 1.5rem 0;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 0 0.7rem rgba(0, 0, 0, 0.3);
`
