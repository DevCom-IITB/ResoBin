import { LoadingOutlined } from '@ant-design/icons'
import { Search } from '@styled-icons/heroicons-outline'
import { Input } from 'antd'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { FilterDropdown } from 'components/filter'
import { HEX2RGBA } from 'helpers'
import { device } from 'styles/responsive'

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
    ${({ theme }) => HEX2RGBA(theme.primary, 0)} 0%,
    ${({ theme }) => HEX2RGBA(theme.primary, 0)} 30%,
    ${({ theme }) => HEX2RGBA(theme.primary, 100)} 50%
  );

  @media ${device.min.lg} {
    margin-right: ${({ theme }) => theme.asideWidth};
    transition: margin-right 200ms ease-in;
  }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 4;
  background-color: rgba(0, 0, 0, 0.55);
`

const StyledSearch = styled(Search)`
  opacity: 0.5;
  width: 1.25rem;
  color: ${({ theme }) => theme.darksecondary};
`

// Disable filter will disable the filter entirely, show filter will trigger on/off animation
const CourseSearch = ({ showFilter }) => {
  // search input state
  const [search, setSearch] = useState('')
  const handleChange = (event) => setSearch(event.currentTarget.value)
  const [loading, setLoading] = useState(false)

  // const { list: courseData } = useSelector((state) => state.course)
  // useEffect(() => {
  //   // search
  // }, [courseData])

  useEffect(() => {
    console.log('search', search)
  }, [search])

  return (
    <SearchContainer>
      <FilterDropdown showFilters={showFilter} />
      {showFilter && <Overlay />}

      <Input
        size="large"
        placeholder="course code, name or description"
        allowClear
        maxLength={100}
        onChange={handleChange}
        value={search}
        prefix={loading ? <LoadingOutlined /> : <StyledSearch />}
      />
    </SearchContainer>
  )
}

export default CourseSearch
