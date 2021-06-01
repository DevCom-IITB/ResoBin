import styled from 'styled-components'
import Checkbox from 'components/shared/Checkbox'
import { useThemeContext } from 'context/ThemeContext'

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

const DarkModeCheckbox = () => {
  const { toggleTheme } = useThemeContext()
  return (
    <CheckboxContainer>
      <Checkbox onClick={toggleTheme} />
      {/* <Title>Dark mode</Title> */}
    </CheckboxContainer>
  )
}

export default DarkModeCheckbox
