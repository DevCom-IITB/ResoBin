import styled from 'styled-components'
import { Divider } from 'components/shared'
import Google from 'assets/images/Google Signin/btn_google_signin_dark_normal_web@2x.png'

const ContainerOr = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 4px;
  margin-bottom: 1rem;
`

const GoogleSignIn = styled.img`
  cursor: pointer;
  width: 13rem;
  margin: 0 auto 1rem;
  user-select: none;
`

const GoogleAuth = () => {
  return (
    <>
      <ContainerOr>
        <Divider style={{ width: '42%' }} />
        OR
        <Divider style={{ width: '42%' }} />
      </ContainerOr>
      <GoogleSignIn src={Google} />
    </>
  )
}

export default GoogleAuth
