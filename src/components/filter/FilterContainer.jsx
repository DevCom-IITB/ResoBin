import { X } from '@styled-icons/heroicons-outline'
import { Checkbox, Select, Slider } from 'antd'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { Aside, Form, Divider, PageHeading } from 'components/shared'
import { ButtonIconDanger } from 'components/shared/Buttons'
import { useQueryString } from 'hooks'
import { selectDepartments } from 'store/courseSlice'
import { device } from 'styles/responsive'

const filterKeys = ['semester', 'department', 'credit', 'p']

const FilterItem = ({ label, onClear }) => (
  <PageHeading style={{ margin: 0 }}>
    <FilterTitle>{label}</FilterTitle>
    <ButtonIconDanger
      tooltip="Clear"
      onClick={onClear}
      icon={<X size="18" />}
    />
  </PageHeading>
)

const FilterContainer = () => {
  const { deleteQueryString, getQueryString, setQueryString } = useQueryString()

  const departmentOptions = useSelector(selectDepartments)?.map(
    (department) => ({
      label: department.name,
      value: department.slug,
    })
  )

  const handleFilterClear =
    (...params) =>
    () => {
      deleteQueryString(...params, 'p')
    }

  const handleFilterUpdate = (_, allFields) => {
    deleteQueryString('p')

    if (allFields?.credit?.[0] !== 2)
      setQueryString('credit_min', allFields.credit[0])

    if (allFields?.credit?.[1] !== 9)
      setQueryString('credit_max', allFields.credit[1])

    if (allFields?.department?.length)
      setQueryString('department', allFields.department)

    if (allFields?.semester?.length)
      setQueryString('semester', allFields.semester)
  }

  return (
    <Form
      name="course_filter"
      layout="vertical"
      onValuesChange={handleFilterUpdate}
      initialValues={{
        semester: getQueryString('semester')?.split(',') ?? [],
        credit: [
          parseInt(getQueryString('credit_min'), 10) ?? 2,
          parseInt(getQueryString('credit_max'), 10) ?? 9,
        ],
        department: getQueryString('department')?.split(',') ?? undefined,
      }}
    >
      <FilterItem label="Semesters" onClear={handleFilterClear('semester')} />
      <Form.Item name="semester">
        <Checkbox.Group>
          <Checkbox value="autumn">Autumn</Checkbox>
          <Checkbox value="spring">Spring</Checkbox>
        </Checkbox.Group>
      </Form.Item>

      <FilterItem
        label="Credits"
        onClear={handleFilterClear('credit_min', 'credit_max')}
      />
      <Form.Item name="credit">
        <Slider
          range
          min={2}
          step={null}
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
          tipFormatter={null}
          style={{ margin: '0 1rem 0 0.5rem' }}
        />
      </Form.Item>

      <FilterItem
        label="Departments"
        onClear={handleFilterClear('department')}
      />
      <Form.Item name="department">
        <Select
          mode="multiple"
          options={departmentOptions}
          placeholder="Type something..."
          allowClear
          showArrow
        />
      </Form.Item>
    </Form>
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

const FilterTitle = styled.span`
  display: inline-block;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
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
