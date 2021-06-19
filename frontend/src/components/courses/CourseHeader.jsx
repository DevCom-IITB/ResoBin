import styled from 'styled-components'
import { Filter } from '@styled-icons/heroicons-outline'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4rem 0 0 11.5rem;
`

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 4.6rem;
  right: 2rem;

  width: 3rem;
  height: 3rem;
  background: ${({ theme }) => theme.darksecondary};
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  right: ${({ showFilters }) => (showFilters ? '-100%' : '2rem')};
`

const CourseHeader = ({ showFilters, handleClick }) => {
  return (
    <Container>
      <IconContainer>
        <Filter showFilters={showFilters} size="1.5rem" onClick={handleClick} />
      </IconContainer>
    </Container>
  )
}

export default CourseHeader
