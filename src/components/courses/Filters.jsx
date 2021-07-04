// import { useState } from 'react'
import { FilterItem } from 'components/courses'
import { Divider } from 'components/shared'
import { filterData } from 'data/courses'
import styled from 'styled-components'

// const Container = styled.div`
//   background: ${({ theme }) => theme.secondary};
//   position: fixed;
//   /* top: 4rem; */
//   right: ${({ showFilters }) => (showFilters ? '0' : '-100%')};

//   width: 19rem;
//   height: 100%;
//   z-index: 7; /* To put searchbar at the bottom */
//   box-shadow: inset 2px 0px 5px rgba(0, 0, 0, 0.3);
//   /* transition-duration: 150ms; */
// `

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.primary};
  top: 0;
`

const OverlayContainer = styled.div`
  position: fixed;
  background: ${({ theme }) => theme.secondary};
  margin: 0 0.75rem;
  width: calc(100% - 1.5rem);
  height: 100%;
  top: ${({ showFilters }) => (showFilters ? '9rem' : '-100%')};
  transition: 500ms;
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
  overflow: auto;
`

// const initialState = {
//   offeredIn: null,
// }

const Filters = ({ showFilters, onClick }) => {
  // const [filters, setFilters] = useState(initialState)

  return (
    <OverlayContainer showFilters={showFilters}>
      <Header>
        <Title>Filter</Title>
      </Header>
      <Divider style={{ margin: '0rem 2rem', width: 'auto' }} />

      <FilterList>
        {filterData.map((data, index) => (
          <FilterItem key={index} data={data} />
        ))}
      </FilterList>
    </OverlayContainer>
  )
}

export default Filters
