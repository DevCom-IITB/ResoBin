import { useEffect } from 'react'
import styled from 'styled-components/macro'

import { Aside, Divider } from 'components/shared'
import { useQueryString } from 'hooks'
import { device } from 'styles/responsive'

import FilterForm from './FilterBody'

const filterKeys = [
  'semester',
  'department',
  'p',
  'credits_min',
  'credits_max',
  'halfsem',
  'running',
  'tags',
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
        <FilterForm setLoading={setLoading} />
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
      <FilterForm setLoading={setLoading} />
    </Aside>
  )
}

const ContainerDropdown = styled.div`
  position: absolute;
  top: 2rem;
  z-index: 5;
  width: 100%;
  height: ${({ showFilter }) => (showFilter ? 'calc(100vh - 5rem)' : '0')};
  padding: ${({ showFilter }) => (showFilter ? '1rem 0 20rem' : '0')};
  overflow: auto;
  background: ${({ theme }) => theme.secondary};
  box-shadow: 2px 0 5px rgb(0 0 0 / 30%);
  transition: 200ms;
`

const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  height: 3rem;
  margin-bottom: 0.5rem;
  padding: 1.25rem 1rem 0;

  @media ${device.min.lg} {
    margin: 0;
    padding: 1rem 1rem 0.5rem;
  }
`

const Title = styled.h4`
  color: ${({ theme }) => theme.textColor};
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 1px;
`

const ClearAll = styled.button`
  color: ${({ theme }) => theme.textColor};
  font-weight: 400;
  font-size: 0.75rem;
  background: transparent;
  border: 0;
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
