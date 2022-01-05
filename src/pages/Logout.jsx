import { Button } from 'antd'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { LoaderAnimation } from 'components/shared'
import { logoutAction } from 'store/authSlice'
import { fontSize } from 'styles/responsive'

const Logout = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)
  const handleLogout = async () => dispatch(logoutAction())

  return (
    <>
      <Helmet>
        <title>Logout - ResoBin</title>
        <meta name="description" content="Login to continue" />
      </Helmet>

      {loading && <LoaderAnimation fixed />}

      <PageContainer>
        <BoxContainer>
          <h4>Are you sure you want to logout?</h4>

          <StyledButton type="primary" onClick={handleLogout}>
            Logout
          </StyledButton>
        </BoxContainer>
      </PageContainer>
    </>
  )
}

export default Logout

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 3rem);
  background-color: ${({ theme }) => theme.secondary};
`

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1.5rem 0;
  background-color: ${({ theme }) => theme.darksecondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 0 0.75rem rgb(0 0 0 / 40%);

  h4 {
    padding: 0 1.5rem;
    color: ${({ theme }) => theme.textColor};
    font-weight: 300;
    font-size: ${fontSize.responsive.lg};
    letter-spacing: 2px;
    text-align: center;
  }
`

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.25rem;
  margin: 1.5rem 1.5rem 0;
  font-weight: 500;
  font-size: 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 0 0.7rem rgb(0 0 0 / 30%);
`
