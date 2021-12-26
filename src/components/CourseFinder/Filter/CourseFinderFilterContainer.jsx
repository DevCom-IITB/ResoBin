import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { Divider } from 'components/shared'
import { useQueryString } from 'hooks'
import { selectIsDropdownActive } from 'store/settingsSlice'
import { device } from 'styles/responsive'

import CourseFinderFilterForm from './CourseFinderFilterForm'

export const filterKeys = [
  'semester',
  'department',
  'p',
  'credits_min',
  'credits_max',
  'halfsem',
  'running',
  'tags',
]

export const CourseFinderFilterDropdown = ({ setLoading }) => {
  const { deleteQueryString } = useQueryString()
  const showFilter = useSelector(selectIsDropdownActive)

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

      <Divider margin="0.75rem 0" />

      <ListDropdown showFilter={showFilter}>
        <CourseFinderFilterForm setLoading={setLoading} />
      </ListDropdown>
    </ContainerDropdown>
  )
}

const ContainerDropdown = styled.div`
  position: absolute;
  top: 2rem;
  z-index: 5;
  width: 100%;
  height: ${({ showFilter }) => (showFilter ? 'calc(100vh - 5rem)' : '0')};
  padding: ${({ showFilter }) => (showFilter ? '1rem 1rem 20rem' : '0')};
  overflow: auto;
  background: ${({ theme }) => theme.secondary};
  box-shadow: 2px 0 5px rgb(0 0 0 / 30%);
  transition: 200ms;
`

const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 1.25rem;

  @media ${device.min.lg} {
    margin: 0;
    padding: 1rem 0 0.5rem;
  }
`

const Title = styled.h4`
  color: ${({ theme }) => theme.textColor};
  font-weight: 700;
  font-size: 1.25rem;
`

export const ClearAll = styled.button`
  color: ${({ theme }) => theme.textColor};
  font-weight: 400;
  font-size: 0.75rem;
  background: transparent;
  border: 0;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const ListDropdown = styled.div`
  display: ${({ showFilter }) => (showFilter ? 'block' : 'none')};
  margin-bottom: 2rem;
`
