import { LoadingOutlined } from '@ant-design/icons'
import { Search } from '@styled-icons/heroicons-outline'
import { Input } from 'antd'
import axios from 'axios'
import { rgba } from 'polished'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled, { createGlobalStyle } from 'styled-components/macro'

import { API } from 'config/api'
import { useQueryString, useResponsive } from 'hooks'
import { selectIsDropdownActive } from 'store/settingsSlice'

let ajaxRequest = null

const SearchBar = ({ loading, setLoading }) => {
  const { isDesktop } = useResponsive()
  const { deleteQueryString, getQueryString, setQueryString } = useQueryString()
  const showFilter = useSelector(selectIsDropdownActive)

  const [search, setSearch] = useState(getQueryString('q'))
  const [suggestions, setSuggestions] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)

  const searchCourses = async (searchTerm) => {
    if (!searchTerm || searchTerm.length < 1) {
      setSuggestions([])
      return
    }

    setSearchLoading(true)
    
    // Add minimum loading time to make animation more visible
    const minLoadingTime = 800 // 800ms minimum loading time
    const startTime = Date.now()
    
    try {
      if (ajaxRequest) ajaxRequest.cancel()
      ajaxRequest = axios.CancelToken.source()

      // Simple approach: always search in code field for course codes
      const response = await API.courses.list({
        params: {
          search_fields: "code",
          q: searchTerm.toUpperCase(),
          page_size: 50, // Get more results to filter from
        },
        cancelToken: ajaxRequest.token
      })

      // console.log(`Search API Response for '${searchTerm}':`, response)
      
      // API interceptor unwraps the response data
      // @ts-ignore - API interceptor handles response unwrapping
      const courses = response?.results || []
      // console.log("All courses from API:", courses.map(c => c.code))
      
      // Simple filtering: show courses that START with the search term
      const filteredCourses = courses.filter(course => 
        course.code.toUpperCase().startsWith(searchTerm.toUpperCase())
      )
      
      // console.log(`Courses starting with '${searchTerm}':`, filteredCourses.map(c => c.code))
      
      // Limit to 10 results and sort alphabetically
      const limitedCourses = filteredCourses.slice(0, 10).sort((a, b) => 
        a.code.localeCompare(b.code)
      )
      
      const formattedSuggestions = limitedCourses.map((course) => ({
        id: course.code,
        value: `${course.code}${course.title ? ` - ${course.title}` : ''}`,
        link: `/courses/${course.code}`,
        course
      }))

      // Ensure minimum loading time for better UX
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime)
      
      setTimeout(() => {
        setSuggestions(formattedSuggestions)
        // console.log("Search found", formattedSuggestions.length, "courses for:", searchTerm)
        setSearchLoading(false)
        setLoading(false) // Stop the main loading spinner
      }, remainingTime)
      
    } catch (error) {
      if (axios.isCancel(error)) return
      // console.error("Search error:", error)
      
      // Ensure minimum loading time even for errors
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime)
      
      setTimeout(() => {
        setSuggestions([])
        setSearchLoading(false)
        setLoading(false) // Stop the main loading spinner
      }, remainingTime)
    }
  }

  const handleSearch = (value) => {
    setSearch(value)
    setQueryString('q', value)
    deleteQueryString('p')
    
    // Only show loading if there's actually a search term
    if (value && value.trim().length > 0) {
      setLoading(true)
      searchCourses(value)
    } else {
      setLoading(false)
      setSuggestions([])
    }
  }

  // Debounce the search to avoid too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search && typeof search === 'string' && search.length >= 1) {
        setLoading(true) // Start loading when search begins
        searchCourses(search)
      } else {
        setSuggestions([])
        setLoading(false) // Stop loading when no search term
      }
    }, 500) // Increased from 300ms to 500ms for longer loading visibility

    return () => clearTimeout(timeoutId)
  }, [search])

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
