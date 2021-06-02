import styled from 'styled-components'
import InputRound from 'components/shared/InputRound'
import HEX2RGBA from 'helpers/HEX2RGBA'
import { Search } from '@styled-icons/heroicons-outline'

const Container = styled.div`
	background: linear-gradient(
		0deg,
		${({ theme }) => HEX2RGBA(theme.primary, 0)} 0%,
		${({ theme }) => HEX2RGBA(theme.primary, 0)} 30%,
		${({ theme }) => HEX2RGBA(theme.primary, 100)} 50%
	);
	display: flex;
	align-items: center;
  justify-content: center;
	height: 4rem;
	position: sticky;
	top: 4rem;
	padding: 0 2rem;
	z-index: 0;
`

const CourseSearchbar = () => {
  return (
    <Container>
      <InputRound icon={Search} placeholder={'Search'} />
    </Container>
  )
}

export default CourseSearchbar
