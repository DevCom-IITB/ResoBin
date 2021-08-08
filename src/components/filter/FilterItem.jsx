// import { Checkbox } from 'components/shared'
import { X } from '@styled-icons/heroicons-outline'
import { Checkbox } from 'antd'
import { Fragment } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

import { ButtonIcon } from 'components/shared'

const Title = styled.span`
  display: inline-block;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.textColor};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  color: white;
`

const FilterItem = ({ data: groupData }) => {
  const location = useLocation()
  const history = useHistory()
  const queryString = new URLSearchParams(location.search)
  const param = groupData.id

  const setQueryString = (query) => {
    // ? No change
    if (query === (queryString.get(param) || '')) return

    // ? update query string or clear query string if query is empty
    if (query) queryString.set(param, query)
    else queryString.delete(param)

    // ? reset pagination
    queryString.delete('p')

    history.push({
      pathname: location.pathname,
      search: `?${queryString.toString()}`,
    })
  }

  const onChange = (checkedValues) => setQueryString(checkedValues)
  const clearAllFilters = () => setQueryString('')

  return (
    <>
      <Header>
        <Title>{groupData.FilterTitle}</Title>
        <ButtonIcon
          tooltip="Bookmark"
          onClick={clearAllFilters}
          size="xs"
          Icon={X}
        />
      </Header>

      <Checkbox.Group onChange={onChange}>
        {groupData.Options.map((optionData) => (
          <Checkbox key={optionData.id} value={optionData.id}>
            {optionData.Label}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </>
  )
}

export default FilterItem
