// import { useState } from 'react'
import { FilterItem } from 'components/filter'
import MultiSelect from 'components/filter/filterData'
import { Divider } from 'components/shared'
import { filterData } from 'data/courses'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  top: 3rem;
  right: ${({ showFilters }) => (showFilters ? '0' : '-100%')};
  z-index: 5;
  width: ${({ theme }) => theme.filterAsideWidth};
  height: calc(100% - 3rem);
  background: ${({ theme }) => theme.secondary};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  transition: 500ms;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  height: 3rem;
  padding: 1rem 1rem 0.5rem;
`

const Title = styled.h4`
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.textColor};
`

const FilterList = styled.div`
  overflow: auto;
  height: 100%;
  padding: 1rem 0.5rem 12rem;
  margin: 0 0.5rem;
`

const ClearAll = styled.button`
  border: 0;
  font-weight: 400;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textColor};
  background: transparent;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 1px;
  }
`

// const initialState = {
//   offeredIn: null,
// }

const FilterAside = ({ showFilters, onClick }) => {
  // const [filters, setFilters] = useState(initialState)
  const handleClearAll = (e) => {
    // setFilters(initialState)
  }

  return (
    <Container showFilters={showFilters}>
      <Header>
        <Title>Filter</Title>
        <ClearAll onClick={handleClearAll}>Clear all</ClearAll>
      </Header>
      <Divider style={{ margin: '0 1rem', width: 'auto' }} />

      <FilterList showFilters={showFilters}>
        {filterData.map((data) => (
          <FilterItem key={data.id} data={data} />
        ))}
        <MultiSelect />
      </FilterList>
    </Container>
  )
}

export default FilterAside
