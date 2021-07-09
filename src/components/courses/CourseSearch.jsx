import { Search } from '@styled-icons/heroicons-outline'
import { Filters } from 'components/filter'
import { InputRounded } from 'components/shared'
import { HEX2RGBA } from 'helpers'
import { useState } from 'react'
import styled from 'styled-components'
// import { Input, Space } from 'antd'
// const { Search } = Input

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
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 4;
  display: ${({ showFilters }) => (showFilters ? 'initial' : 'none')};
  background-color: rgba(0, 0, 0, 0.55);
`

// const StyledSearch = styled(Search)`
//   .ant-input {
//     border-radius: 2rem;
//   }
//   .ant-input-search-button {
//     border-radius: 2rem;
//   }
// `

const CourseSearch = ({ showFilters, handleClick }) => {
  const [search, setSearch] = useState('')
  const handleChange = (event) => setSearch((e) => e.target.value)
  // const onSearch = () => {
  //   console.log(search)
  // }

  return (
    <SearchContainer>
      <Filters showFilters={showFilters} onClick={handleClick} />
      <Overlay showFilters={showFilters} />
      <InputRounded
        name="courseSearch"
        type="search"
        placeholder="Course code, name or description"
        value={search}
        onChange={handleChange}
        label="Search"
        Icon={Search}
      />
      {/* <StyledSearch
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: 200 }}
      /> */}
    </SearchContainer>
  )
}

export default CourseSearch
