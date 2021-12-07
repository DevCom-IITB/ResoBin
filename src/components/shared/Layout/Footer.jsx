import { Layout } from 'antd'
import styled from 'styled-components/macro'

import { Divider } from 'components/shared'

const Footer = () => {
  return (
    <StyledLayoutFooter>
      <Divider style={{ margin: '1rem 0 2rem' }} />
      <h4>ResoBin ©2021. All rights reserved.</h4>
      <h5>
        Created by <a href="https://www.devcom-iitb.org">DevCom, IIT Bombay.</a>
      </h5>
    </StyledLayoutFooter>
  )
}

export default Footer

const StyledLayoutFooter = styled(Layout.Footer)`
  background: transparent;
  color: white;
  font-size: 1rem;
  text-align: center;
  padding-top: 0;
  padding-bottom: 2rem;

  a:hover {
    text-decoration: underline;
  }
`
