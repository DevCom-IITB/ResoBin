import { Github } from '@styled-icons/fa-brands'
import { Layout } from 'antd'
import styled from 'styled-components/macro'

import { Divider } from 'components/shared'
import { fontSize } from 'styles/responsive'

const Footer = () => {
  return (
    <StyledLayoutFooter>
      <Divider style={{ margin: '0.5rem 0 1.5rem' }} />
      <Icons>
        <a
          href="https://www.github.com/wncc/resobin"
          target="_blank"
          rel="noreferrer"
        >
          <Github size="28" />
        </a>
      </Icons>

      <h4>ResoBin</h4>

      <h5>
        Created with ❤️ by{' '}
        <a href="https://www.devcom-iitb.org" target="_blank" rel="noreferrer">
          DevCom, IIT Bombay.
        </a>
      </h5>
    </StyledLayoutFooter>
  )
}

export default Footer

const StyledLayoutFooter = styled(Layout.Footer)`
  background: transparent;
  color: ${({ theme }) => theme.textColor};
  font-size: ${fontSize.responsive.sm};
  text-align: center;
  padding: 0 0.75rem 1.5rem;

  a:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.textColor};
  }

  svg:hover {
    color: ${({ theme }) => theme.logo};
  }

  h4 {
    color: ${({ theme }) => theme.textColor};
    margin-bottom: 0.25rem;
  }

  h5 {
    color: ${({ theme }) => theme.textColorInactive};
    font-weight: 400;
  }
`

const Icons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0;
`
