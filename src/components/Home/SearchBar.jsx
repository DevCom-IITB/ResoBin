import { LoadingOutlined } from '@ant-design/icons'
import { Search } from '@styled-icons/heroicons-outline'
import { Input } from 'antd'
import { rgba } from 'polished'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled, { createGlobalStyle } from 'styled-components/macro'

import { useQueryString, useResponsive } from 'hooks'
import { selectIsDropdownActive } from 'store/settingsSlice'

const SearchBar = ({ loading, setLoading, data }) => {
  const { isDesktop } = useResponsive()
  const { deleteQueryString, getQueryString, setQueryString } = useQueryString()
  const showFilter = useSelector(selectIsDropdownActive)

  const [search, setSearch] = useState(getQueryString('q'))

  const handleSearch = (value) => {
    setLoading(true)
    setSearch(value)
    setQueryString('q', value)
    deleteQueryString('p')
    if (!value) {
      setLoading(false)
    }
  }

  const filterSuggestions = (value) => {
    if (!data) {
      return []
    }

    const lowercaseValue = value ? value.toLowerCase() : ''

    const suggestions = []

    data.forEach(({ code, semester }) => {
      const lowercaseCode = code.toLowerCase()

      if (lowercaseCode.includes(lowercaseValue)) {
        if (semester.length > 0) {
          const { timetable } = semester[0]

          if (timetable.length > 0) {
            timetable.forEach(
              ({ id, division, lectureSlots, tutorialSlots }) => {
                const suggestion = {
                  id,
                  value: `${code} - ${division}`,
                  link: `/courses/${code}`,
                }

                if (lectureSlots.length > 0 && tutorialSlots.length > 0) {
                  suggestion.value += ` - ${lectureSlots.join(
                    ', '
                  )} - ${tutorialSlots.join(', ')}`
                } else if (lectureSlots.length > 0) {
                  suggestion.value += ` - ${lectureSlots.join(', ')}`
                } else if (tutorialSlots.length > 0) {
                  suggestion.value += ` - ${tutorialSlots.join(', ')}`
                }

                suggestions.push(suggestion)
              }
            )
          } else {
            suggestions.push({
              id: -1,
              value: code,
              link: `/courses/${code}`,
            })
          }
        }
      }
    })
    return suggestions
  }

  const suggestions = filterSuggestions(search)

  return (
    <>
      <GlobalStyles />

      <SearchContainer>
        {showFilter && isDesktop && <Overlay />}
        <StyledInput
          size="large"
          placeholder="Search"
          allowClear
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          prefix={<StyledIcon Icon={loading ? LoadingOutlined : Search} />}
        />
        {search && suggestions.length > 0 && (
          <Suggestions>
            {suggestions.map((option) => (
              <Option
                key={option.value}
                onClick={() => {
                  window.location.href = option.link
                }}
              >
                {option.value}
              </Option>
            ))}
          </Suggestions>
        )}
      </SearchContainer>
    </>
  )
}

export default SearchBar

const GlobalStyles = createGlobalStyle`
  .ant-select-dropdown {
    min-height: 200px;
  }
`

const SearchContainer = styled.div`
  position: sticky;
  top: ${({ theme }) => theme.headerHeight};
  z-index: 6;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 15rem;
  background: linear-gradient(
    0deg,
    ${({ theme }) => rgba(theme.darksecondary, 0)} 0%,
    ${({ theme }) => rgba(theme.darksecondary, 0)} 30%,
    ${({ theme }) => rgba(theme.darksecondary, 1)} 50%
  );
`

const StyledIcon = styled(({ Icon, className, ...props }) => {
  return <Icon {...props} className={className} />
})`
  width: 1.1rem;
  margin-right: 0.4rem;
  color: #bbb;
`

const StyledInput = styled(Input)`
  width: 600px;
  max-width: 90%;
  height: 2.2rem;
  background: #2b273b !important;
  border: 1px solid #3e3e60 !important;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);

  .ant-input {
    background: transparent !important;
    color: #ddd !important;
    font-size: 0.9rem;
    padding: 0 0.5rem;
  }

  .anticon-close-circle > svg {
    width: 0.8rem;
    height: 0.8rem;
    color: #aaa;
  }

  &:focus-within {
    border-color: #6d5dfc !important; /* subtle glow */
    box-shadow: 0 0 6px rgba(109, 93, 252, 0.6);
  }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 4;
  background: rgb(0 0 0 / 55%);
  pointer-events: none;
`

const Suggestions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #2b273b;
  border: 1px solid #3e3e60;
  border-top: none;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  max-height: 200px;
  overflow-y: auto;
`

const Option = styled.div`
  padding: 0.6rem 0.8rem;
  cursor: pointer;
  color: #ddd;
  font-size: 0.9rem;

  &:hover {
    background-color: #3a344a;
  }
`
