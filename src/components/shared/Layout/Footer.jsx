import { Github } from '@styled-icons/fa-brands'
import { Layout } from 'antd'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import { ResoBinText, Divider } from 'components/shared'
import { selectIsAuthenticated } from 'store/authSlice'
import { fontSize } from 'styles/responsive'

const Footer = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)

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

      <ResoBinText size="1rem" />

      <h5 style={{ fontWeight: '400' }}>
        Created with ❤️ by&nbsp;
        <a href="https://devcom.gymkhana.iitb.ac.in/" target="_blank" rel="noreferrer">
          DevCom
        </a>
        &nbsp;in collaboration with&nbsp;
        <a
          href="https://www.insti.app/org/ugac"
          target="_blank"
          rel="noreferrer"
        >
          UGAC
        </a>
        .
      </h5>

      <h5>Copyright &copy; 2021 DevCom, IIT Bombay - All Rights Reserved.</h5>

      {isAuthenticated && (
        <h5>
          <Link to="/contact">Contact</Link> &bull;&nbsp;
          <Link to="/privacy-policy">Privacy</Link> &bull;&nbsp;
          <Link to="/terms-and-conditions">Terms</Link>
        </h5>
      )}
    </StyledLayoutFooter>
  )
}

export default Footer

const StyledLayoutFooter = styled(Layout.Footer)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  padding: 0 0.75rem 1.5rem;
  color: ${({ theme }) => theme.textColor};
  font-size: ${fontSize.responsive.sm};
  text-align: center;
  background: transparent;

  svg {
    color: ${({ theme }) => theme.textColor};

    :hover {
      color: ${({ theme }) => theme.logo};
    }
  }

  h5 {
    font-weight: 300;
  }
`

const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
