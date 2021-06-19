import { useState } from 'react'
import styled from 'styled-components'
import { Divider } from 'components/shared'
import { FiltersBody } from 'components/courses'
import { Filter as FilterIcon, X } from '@styled-icons/heroicons-outline'
// @styled-icons/remix-line/Close
// import { X } from '@styled-icons/heroicons-solid'

const Container = styled.div`
  background: ${({ theme }) => theme.secondary};
  position: fixed;
  top: 4rem;
  width: 19rem;
  height: 100%;
  padding: 1.25rem 2rem;
  z-index: 7; /* To put searchbar at the bottom */
  box-shadow: inset 2px 0px 5px rgba(0, 0, 0, 0.3);
  /* right: ${({ sidebar }) => (sidebar ? '0' : '-100%')}; */
  right: 0;
`

const Title = styled.h4`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 1.5px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`

const StyledFilter = styled(FilterIcon)`
  position: fixed;
  top: 3rem;
  right: 0;
  width: 1.75rem;
  margin: 1.25rem 2rem;
  /* z-index: 99; */
  /* right: ${({ sidebar }) => (sidebar ? '-100%' : '0')}; */
  cursor: pointer;
`

const XStyle = {
  cursor: 'pointer',
  width: '1.75rem',
}

const Filters = () => {
  const [showSidebar, setShowSidebar] = useState(true)
  const handleClick = () => {
    setShowSidebar(!showSidebar)
  }

  return showSidebar ? (
    <Container>
      <Header>
        <Title>Filter</Title>
        <X style={XStyle} onClick={handleClick} />
      </Header>
      <Divider />
      <FiltersBody />
    </Container>
  ) : (
    <StyledFilter size="4rem" onClick={handleClick} />
  )
}

export default Filters
