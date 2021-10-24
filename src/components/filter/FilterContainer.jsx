import { useEffect } from 'react'
import styled from 'styled-components/macro'

import { Aside, Divider } from 'components/shared'
import { useQueryString } from 'hooks'
import { device } from 'styles/responsive'

import FilterContainer from './FilterBody'

const filterKeys = [
  'semester',
  'department',
  'p',
  'credits_min',
  'credits_max',
  'halfsem',
]

export const FilterDropdown = ({ showFilter, setLoading }) => {
  const { deleteQueryString } = useQueryString()

  useEffect(() => {
    document.body.style.overflow = showFilter ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showFilter])

  return (
    <ContainerDropdown showFilter={showFilter}>
      <Header>
        <Title>Filter</Title>
        <ClearAll onClick={() => deleteQueryString(...filterKeys)}>
          Reset all
        </ClearAll>
      </Header>
      <Divider style={{ margin: '0 1rem', width: 'auto' }} />

      <ListDropdown showFilter={showFilter}>
        <FilterContainer setLoading={setLoading} />
      </ListDropdown>
    </ContainerDropdown>
  )
}

export const FilterAside = ({ setLoading }) => {
  const { deleteQueryString } = useQueryString()

  return (
    <Aside
      title="Filter"
      subtitle={
        <ClearAll onClick={() => deleteQueryString(...filterKeys)}>
          Reset all
        </ClearAll>
      }
    >
      <FilterContainer setLoading={setLoading} />
    </Aside>
  )
}

const ContainerDropdown = styled.div`
  position: absolute;
  top: 2rem;
  z-index: 5;
  overflow: auto;
  width: calc(100% - 1.5rem);
  height: ${({ showFilter }) => (showFilter ? 'calc(100vh - 5rem)' : '0')};
  padding: ${({ showFilter }) => (showFilter ? '1rem 0 20rem' : '0')};
  margin: 0 0.75rem;
  background: ${({ theme }) => theme.secondary};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  transition: 200ms;
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
  display: ${({ showFilter }) => (showFilter ? 'block' : 'none')};
  padding: 1rem 1rem 2rem;
`
