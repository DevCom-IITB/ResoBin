import styled from 'styled-components'
import { User } from '@styled-icons/feather'
import { ResoBinLogo, Divider } from 'components/shared'

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
      <ResoBinLogo size="3rem" />
      <Divider margin="2rem 0 1rem 0" style={{ opacity: '0. ' }} />
      <User size="4rem" />
      <TitleHeader>Welcome</TitleHeader>
    </TitleContainer>
  )
}

export default Title
