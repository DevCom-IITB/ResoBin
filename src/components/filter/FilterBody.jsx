import { X } from '@styled-icons/heroicons-outline'
import { Checkbox, Select, Slider } from 'antd'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { Form, PageHeading } from 'components/shared'
import { ButtonIconDanger } from 'components/shared/Buttons'
import { useQueryString } from 'hooks'
import { selectDepartments } from 'store/courseSlice'

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
    else deleteQueryString('credit_min')

    if (allFields?.credit?.[1] !== 9)
      setQueryString('credit_max', allFields.credit[1])
    else deleteQueryString('credit_max')

    setQueryString('department', allFields.department)
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
          parseInt(getQueryString('credit_min') ?? 2, 10),
          parseInt(getQueryString('credit_max') ?? 9, 10),
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

export default FilterContainer

const FilterTitle = styled.span`
  display: inline-block;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
`
