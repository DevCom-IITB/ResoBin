import { useContext } from 'react'
import styled from 'styled-components'
import { Toggle } from 'components/shared'
import { ThemeContext } from 'context'

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
`

// const Title = styled.h4`
//   font-weight: 300;
//   font-size: 0.8rem;
//   line-height: 80%;
//   padding-top: 0.5rem;
//   color: ${({ theme }) => theme.textColor};
//   white-space: nowrap;
// `

const DarkmodeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <CheckboxContainer>
      <Toggle onClick={toggleTheme} defaultChecked={theme === 'dark'} />
      {/* <Title>Dark mode</Title> */}
    </CheckboxContainer>
  )
}

export default DarkmodeToggle
