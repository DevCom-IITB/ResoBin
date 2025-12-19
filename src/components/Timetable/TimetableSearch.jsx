import { LoadingOutlined } from '@ant-design/icons'
import { Search } from '@styled-icons/heroicons-outline'
import { Input } from 'antd'
import { rgba } from 'polished'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled, { createGlobalStyle } from 'styled-components/macro'

import { useQueryString, useResponsive } from 'hooks'
import { selectIsDropdownActive } from 'store/settingsSlice'

const TimetableSearch = ({ loading, setLoading, data, addToTimetable }) => {
  const { isDesktop } = useResponsive()
  const { deleteQueryString, getQueryString, setQueryString } = useQueryString()
  const showFilter = useSelector(selectIsDropdownActive)

  const [search, setSearch] = useState(getQueryString('q'))

  const handleSearch = (value) => {
    setLoading(true)
    setSearch(value)
    setQueryString('q', value)
    deleteQueryString('p')
  }

  const filterSuggestions = (value) => {
    if (!data) return []

    const q = (value || '').trim().toLowerCase()
    if (!q) return []

    const codeMatches = []
    const titleOnlyMatches = []

    const titleWordStart = new RegExp(`(^|\\s)${q}`)

    data.forEach(({ code, title, semester }) => {
      const codeLc = (code || '').toLowerCase()
      const titleLc = (title || '').toLowerCase()

      const matchesCode = codeLc.startsWith(q) || codeLc.includes(q)
      const matchesTitle = titleWordStart.test(titleLc)

      if (!matchesCode && !matchesTitle) return

      const titlePart = title ? ` - ${title}` : ''
      const timetables = semester?.[0]?.timetable || []

      if (timetables.length > 0) {
        timetables.forEach(
          ({ id, division, lectureSlots = [], tutorialSlots = [] }) => {
            const suggestion = {
              id,
              value: `${code}${titlePart} - ${division}`,
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

            if (matchesCode) codeMatches.push(suggestion)
            else titleOnlyMatches.push(suggestion)
          }
        )
      } else {
        const suggestion = {
          id: -1,
          value: `${code}${titlePart}`,
          link: `/courses/${code}`,
        }

        if (matchesCode) codeMatches.push(suggestion)
        else titleOnlyMatches.push(suggestion)
      }
    })
    const seen = new Set()
    return [...codeMatches, ...titleOnlyMatches].filter((s) => {
      if (seen.has(s.value)) return false
      seen.add(s.value)
      return true
    })
  }

  const suggestions = filterSuggestions(search)

  return (
    <>
      <GlobalStyles />

      <SearchContainer>
        {showFilter && isDesktop && <Overlay />}
        <StyledInput
          size="large"
          placeholder="Course Code or Title"
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
                <AddButton
                  onClick={(event) => {
                    event.stopPropagation()
                    addToTimetable(option.value, option.id)
                    deleteQueryString('q')
                    setSearch('')
                  }}
                >
                  ⚡ Add
                </AddButton>
              </Option>
            ))}
          </Suggestions>
        )}
      </SearchContainer>
    </>
  )
}

export default TimetableSearch

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
  width: 1rem;
  margin-right: 0.5rem;
  color: lightgray;
`

const StyledInput = styled(Input)`
  z-index: 10 !important;
  height: 2rem;
  padding: 0 0.75rem;
  background: ${({ theme }) => theme.secondary};
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 8px 5px rgb(0 0 0 / 30%);

  .ant-input {
    padding: 0 0.25rem;
    color: lightgray;
    font-weight: 400;
    font-size: 0.875rem;
    background: ${({ theme }) => theme.secondary};
  }

  .anticon-close-circle > svg {
    width: 0.875rem;
    height: 0.875rem;
    color: lightgray;
  }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 4;
  background: rgb(0 0 0 / 55%);
`

const Suggestions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.secondary};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-top: none;
  border-radius: 0 0 ${({ theme }) => theme.borderRadius}
    ${({ theme }) => theme.borderRadius};
  box-shadow: 0 8px 5px rgb(0 0 0 / 30%);
`

const Option = styled.div`
  position: relative;
  padding: 0.5rem;
  padding-right: 4rem;
  cursor: pointer;
  color: lightgray;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryHover};
  }
`

const AddButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.primary};
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: bold; /* Added font-weight */
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryHover};
  }
`
