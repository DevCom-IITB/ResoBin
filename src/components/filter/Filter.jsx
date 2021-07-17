import { useEffect } from 'react'
import styled from 'styled-components'

import { FilterItem } from 'components/filter'
import MultiSelect from 'components/filter/filterData'
import { Divider } from 'components/shared'
import { filterData } from 'data/courses'
import { device } from 'styles/responsive'

const ContainerDropdown = styled.div`
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

const ContainerAside = styled.div`
  position: fixed;
  top: 3rem;
  right: ${({ showFilters }) => (showFilters ? '0' : '-100%')};
  z-index: 5;
  width: ${({ theme }) => theme.asideWidth};
  height: calc(100% - 3rem);
  background: ${({ theme }) => theme.secondary};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  transition: right 200ms ease-in;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  height: 3rem;
  padding: 1.25rem 1rem 0;
  margin-bottom: 0.5rem;

  @media ${device.min.lg} {
    padding: 1rem 1rem 0.5rem;
    margin: 0;
  }
`

const Title = styled.h4`
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.textColor};
`

const ClearAll = styled.button`
  border: 0;
  font-size: 0.75rem;
  font-weight: 400;
  color: ${({ theme }) => theme.textColor};
  background: transparent;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 1px;
  }
`

const ListDropdown = styled.div`
  display: ${({ showFilters }) => (showFilters ? 'block' : 'none')};
  padding: 1rem 1rem 2rem;
`

const ListAside = styled.div`
  overflow: auto;
  height: 100%;
  padding: 1rem 0.5rem 20rem;
  margin: 0 0.5rem;
`

// const initialState = {
//   offeredIn: null,
// }

export const FilterDropdown = ({ showFilters }) => {
  // const [filters, setFilters] = useState(initialState)
  const handleClearAll = (e) => {
    // setFilters(initialState)
  }

  useEffect(() => {
    document.body.style.overflow = showFilters ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showFilters])

  return (
    <ContainerDropdown showFilters={showFilters}>
      <Header>
        <Title>Filter</Title>
        <ClearAll onClick={handleClearAll}>Clear all</ClearAll>
      </Header>
      <Divider style={{ margin: '0 1rem', width: 'auto' }} />

      <ListDropdown showFilters={showFilters}>
        {filterData.map((data) => (
          <FilterItem key={data.id} data={data} />
        ))}
        <MultiSelect />
      </ListDropdown>
    </ContainerDropdown>
  )
}

export const FilterAside = ({ showFilters }) => {
  // const [filters, setFilters] = useState(initialState)
  const handleClearAll = (e) => {
    // setFilters(initialState)
  }

  return (
    <ContainerAside showFilters={showFilters}>
      <Header>
        <Title>Filter</Title>
        <ClearAll onClick={handleClearAll}>Clear all</ClearAll>
      </Header>
      <Divider style={{ margin: '0 1rem', width: 'auto' }} />

      <ListAside>
        {filterData.map((data) => (
          <FilterItem key={data.id} data={data} />
        ))}

        <MultiSelect />
      </ListAside>
    </ContainerAside>
  )
}
