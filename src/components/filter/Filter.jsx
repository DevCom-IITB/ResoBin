import { FilterItem } from 'components/filter'
import { Divider } from 'components/shared'
import { filterData } from 'data/courses'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  top: 2rem;
  z-index: 5;
  overflow: auto;
  width: calc(100% - 1.5rem);
  height: ${({ showFilters }) => (showFilters ? 'calc(100vh - 5rem)' : '0')};
  padding: ${({ showFilters }) => (showFilters ? '1rem 0 20rem' : '0')};
  margin: 0 0.75rem;
  background: ${({ theme }) => theme.secondary};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  transition: 500ms;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  height: 3rem;
  padding: 1.25rem 1rem 0;
  margin-bottom: 0.5rem;
`

const Title = styled.h4`
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.textColor};
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

const FilterList = styled.div`
  display: ${({ showFilters }) => (showFilters ? 'block' : 'none')};
  opacity: 100%;
  padding: 1rem 1rem 2rem;
`

// const initialState = {
//   offeredIn: null,
// }

const Filters = ({ showFilters, onClick }) => {
  document.body.style.overflow = showFilters ? 'hidden' : 'auto'

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
      </FilterList>
    </Container>
  )
}

export default Filters
