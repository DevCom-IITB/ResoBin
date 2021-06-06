import styled from 'styled-components'
import { User } from '@styled-icons/feather'

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TitleHeader = styled.h4`
  font-weight: 300;
  font-size: 1.5rem;
  line-height: 2rem;
  letter-spacing: 4px;
  padding: 0.5rem 0px 0rem;
  text-align: center;
  color: ${({ theme }) => theme.textColor};
`

const Title = () => {
  return (
    <TitleContainer>
      <User size="4rem" />
      <TitleHeader>Welcome</TitleHeader>
    </TitleContainer>
  )
}

export default Title
