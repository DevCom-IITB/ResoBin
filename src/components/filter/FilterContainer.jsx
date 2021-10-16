import { Checkbox, Form, Select, Slider } from 'antd'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { FilterItem } from 'components/filter'
import { FilterItemContainer } from 'components/filter/FilterItem'
import { Aside, Divider } from 'components/shared'
import { useQueryString } from 'hooks'
import { selectDepartments } from 'store/courseSlice'
import { device } from 'styles/responsive'

const filterKeys = ['sem', 'lvl', 'dept', 'cred', 'p']

const FilterContainer = () => {
  const { deleteQueryString, getQueryString, setQueryString } = useQueryString()

  const departmentOptions = useSelector(selectDepartments)?.map(
    (department) => ({
      label: department.name,
      value: department.id,
    })
  )

  const handleFilterClear = (param) => () => {
    setQueryString(param, [])
    deleteQueryString('p')
  }

  return (
    <StyledForm
      name="course_filter"
      layout="vertical"
      onFieldsChange={(_, allFields) => {
        console.log('allFields: ', allFields)
      }}
    >
      <FilterItemContainer
        label="Semester"
        handleClear={handleFilterClear('semester')}
      >
        <Form.Item name="semester">
          <Checkbox.Group>
            <Checkbox value="autumn">Autumn</Checkbox>
            <Checkbox value="spring">Spring</Checkbox>
          </Checkbox.Group>
        </Form.Item>
      </FilterItemContainer>

      <FilterItemContainer
        label="Credits"
        handleClear={handleFilterClear('credits')}
      >
        <Form.Item name="credits">
          <Slider
            range
            min={2}
            max={9}
            marks={{
              2: '<3',
              3: '3',
              4: '4',
              5: '5',
              6: '6',
              7: '7',
              8: '8',
              9: '>8',
            }}
            defaultValue={[2, 9]}
            style={{ margin: '0 0.5rem' }}
          />
        </Form.Item>
      </FilterItemContainer>

      <FilterItemContainer
        label="Department"
        handleClear={handleFilterClear('department')}
      >
        <Form.Item name="department">
          <Select
            options={departmentOptions}
            mode="multiple"
            placeholder="Please select favourite colors"
          />
        </Form.Item>
      </FilterItemContainer>
    </StyledForm>
  )
}

export const FilterDropdown = ({ showFilter }) => {
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
          Clear all
        </ClearAll>
      </Header>
      <Divider style={{ margin: '0 1rem', width: 'auto' }} />

      <ListDropdown showFilter={showFilter}>
        <FilterContainer />
      </ListDropdown>
    </ContainerDropdown>
  )
}

const StyledForm = styled(Form)`
  .ant-checkbox-wrapper {
    margin: 0;
    font-size: 0.75rem;
    font-weight: 400;
    color: ${({ theme }) => theme.textColor};
  }

  .ant-checkbox-checked {
    .ant-checkbox-inner {
      border-color: ${({ theme }) => theme.logo};
      background: ${({ theme }) => theme.logo};
    }
  }
`

export const FilterAside = ({ showFilter }) => {
  const { deleteQueryString } = useQueryString()

  return (
    <Aside
      title="Filter"
      subtitle={
        <ClearAll onClick={() => deleteQueryString(...filterKeys)}>
          Clear all
        </ClearAll>
      }
      visible={showFilter}
    >
      {/* {filterData.map((data) => (
        <FilterItem key={data.id} data={data} />
      ))}

      <Form.Item
        name="select-multiple"
        label="Select[multiple]"
        rules={[
          {
            required: true,
            message: 'Please select your favourite colors!',
            type: 'array',
          },
        ]}
      >
        <Select
          options={departmentOptions}
          mode="multiple"
          placeholder="Please select favourite colors"
        />
      </Form.Item>

      <MultiSelect /> */}

      <FilterContainer />
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
