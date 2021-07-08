import { FilterItem } from 'components/courses'
import { Divider } from 'components/shared'
import { filterData } from 'data/courses'
import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.secondary};
  margin: 0 0.75rem;
  padding: ${({ showFilters }) => (showFilters ? '1rem 0 8rem' : '0')};
  height: ${({ showFilters }) => (showFilters ? 'calc(100vh - 5rem)' : '0')};
  width: calc(100% - 1.5rem);

  top: 2rem;

  transition: 500ms;
  z-index: 5;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.3);
  overflow: auto;
`

const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  height: 3rem;
  margin-bottom: 0.5rem;
  padding: 1.25rem 1rem 0;
`

const Title = styled.h4`
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.textColor};
`

const ClearAll = styled.button`
  background: transparent;
  border: 0;
  font-weight: 400;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  font-size: 0.75rem;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 1px;
  }
`

const FilterList = styled.div`
  display: ${({ showFilters }) => (showFilters ? 'block' : 'none')};
  opacity: 100%;
  padding: 1rem 1rem 2rem;
`

const initialState = {
  offeredIn: null,
}

const Filters = ({ showFilters, onClick }) => {
  const [filters, setFilters] = useState(initialState)
  document.body.style.overflow = showFilters ? 'hidden' : 'auto'

  const handleClearAll = (e) => {
    setFilters(initialState)
  }

  return (
    <Container showFilters={showFilters}>
      <Header>
        <Title>Filter</Title>
        <ClearAll onClick={handleClearAll}>Clear all</ClearAll>
      </Header>
      <Divider style={{ margin: '0rem 1rem', width: 'auto' }} />

      <FilterList showFilters={showFilters}>
        {filterData.map((data) => (
          <FilterItem key={data.id} data={data} />
        ))}
      </FilterList>
    </Container>
  )
}

export default Filters
