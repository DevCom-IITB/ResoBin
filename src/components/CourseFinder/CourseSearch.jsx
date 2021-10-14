/* eslint-disable react-hooks/exhaustive-deps */
import { LoadingOutlined } from '@ant-design/icons'
import { Search } from '@styled-icons/heroicons-outline'
import { Input } from 'antd'
import debounce from 'lodash/debounce'
import { rgba } from 'polished'
import { useCallback, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import styled from 'styled-components/macro'

import { FilterDropdown } from 'components/filter'
import { device } from 'styles/responsive'

// ? Disable filter will disable the filter entirely, show filter will trigger on/off animation
const CourseSearch = ({ showFilter, loading, setLoading }) => {
  const location = useLocation()
  const history = useHistory()

  const [search, setSearch] = useState('')

  const setQueryString = (query) => {
    const queryString = new URLSearchParams(location.search)
    // ? No change
    if (query === (queryString.get('q') || '')) return

    // ? update query string or clear query string if query is empty
    if (query) queryString.set('q', query)
    else queryString.delete('q')

    // ? reset pagination
    queryString.delete('p')

    history.push({
      pathname: location.pathname,
      search: `?${queryString.toString()}`,
    })

    setLoading(false)
  }

  const setQueryStringDebounced = useCallback(debounce(setQueryString, 500), [
    location,
  ])

  const handleSearch = (event) => {
    setLoading(true)
    setSearch(event.target.value)
    setQueryStringDebounced(event.target.value)
  }

  return (
    <SearchContainer>
      <FilterDropdown showFilter={showFilter} />
      {showFilter && <Overlay />}

      <StyledInput
        size="large"
        placeholder="Course code, name or description"
        allowClear
        maxLength={100}
        onChange={handleSearch}
        value={search}
        prefix={<StyledIcon Icon={loading ? LoadingOutlined : Search} />}
      />
    </SearchContainer>
  )
}

export default CourseSearch

const SearchContainer = styled.div`
  position: sticky;
  top: 3rem;
  z-index: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  padding: 0 0.75rem;
  background: linear-gradient(
    0deg,
    ${({ theme }) => rgba(theme.darksecondary, 0)} 0%,
    ${({ theme }) => rgba(theme.darksecondary, 0)} 30%,
    ${({ theme }) => rgba(theme.darksecondary, 1)} 50%
  );

  @media ${device.min.lg} {
    margin-right: ${({ theme }) => theme.asideWidthRight};
    transition: margin-right 200ms ease-in;
  }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 4;
  background-color: rgba(0, 0, 0, 0.55);
`

const StyledIcon = styled(({ Icon, className, ...props }) => {
  return <Icon {...props} className={className} />
})`
  width: 1rem;
  margin-right: 0.5rem;
  color: lightgray;
`

const StyledInput = styled(Input)`
  z-index: 10 !important;
  height: 2rem;
  padding: 0 0.75rem;
  border: 0;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.secondary};
  box-shadow: 0 8px 5px rgba(0, 0, 0, 0.3);

  .ant-input {
    padding: 0 0.25rem;
    font-size: 0.875rem;
    font-weight: 400;
    color: lightgray;
    background: ${({ theme }) => theme.secondary};
  }

  .anticon-close-circle > svg {
    width: 0.875rem;
    height: 0.875rem;
    color: lightgray;
  }
`
