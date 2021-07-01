// import { useState } from 'react'
import styled from 'styled-components'
import { X } from '@styled-icons/heroicons-outline'
import { filterData } from 'data/courses'
import { FilterItem } from 'components/courses'
import { Divider } from 'components/shared'
// import DropdownMulti from './DropdownMulti'
import { scrollBar } from 'styles'

const Container = styled.div`
  background: ${({ theme }) => theme.secondary};
  position: fixed;
  top: 4rem;
  right: ${({ showFilters }) => (showFilters ? '0' : '-100%')};

  width: 19rem;
  height: 100%;
  z-index: 7; /* To put searchbar at the bottom */
  box-shadow: inset 2px 0px 5px rgba(0, 0, 0, 0.3);
  /* transition-duration: 150ms; */
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  margin-bottom: 1rem;
  padding: 1.25rem 2rem 0;
`

const Title = styled.h4`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: ${({ theme }) => theme.textColor};
`

const FilterList = styled.div`
  opacity: 100%;
  padding: 0rem 2rem 2rem;
  height: calc(100% - 8rem);
  ${scrollBar}
`

// const initialState = {
//   offeredIn: null,
// }

const Filters = ({ showFilters, onClick }) => {
  // const [filters, setFilters] = useState(initialState)

  return (
    <Container showFilters={showFilters}>
      <Header>
        <Title>Filter</Title>
        <X
          style={{
            cursor: 'pointer',
            width: '1.75rem',
          }}
          onClick={onClick}
        />
      </Header>
      <Divider style={{ margin: '0rem 2rem', width: 'auto' }} />

      <FilterList>
        {/* <DropdownMulti /> */}
        {filterData.map((data, index) => (
          <FilterItem key={index} data={data} />
        ))}
      </FilterList>
    </Container>
  )
}

export default Filters
