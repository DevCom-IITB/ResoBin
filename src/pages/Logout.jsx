import { Button } from 'antd'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { LoaderAnimation, PageContainer } from 'components/shared'
import { logoutAction } from 'store/authSlice'
import { fontSize } from 'styles/responsive'

const Logout = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)
  const handleLogout = async () => dispatch(logoutAction())

  return (
    <PageContainer>
      <Helmet>
        <title>Logout - ResoBin</title>
        <meta name="description" content="Login to continue" />
      </Helmet>

      {loading && <LoaderAnimation fixed />}

      <BoxContainer>
        <h4>Are you sure?</h4>

        <StyledButton danger type="primary" onClick={handleLogout}>
          Logout
        </StyledButton>
      </BoxContainer>
    </PageContainer>
  )
}

export default Logout

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
  margin: auto;
  background-color: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 0 0.75rem rgb(0 0 0 / 20%);
  max-width: 20rem;
  padding: 1.5rem 2rem;

  h4 {
    font-size: ${fontSize.responsive.md};
    font-weight: 400;
    color: ${({ theme }) => theme.textColor};
  }
`

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fontSize.responsive.sm};
  padding: 0.875rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
`
