import { X } from '@styled-icons/heroicons-outline'
import { Checkbox, Select, Slider, Switch } from 'antd'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { Form, PageHeading } from 'components/shared'
import { ButtonIconDanger } from 'components/shared/Buttons'
import { useQueryString } from 'hooks'
import { selectDepartments } from 'store/courseSlice'

const FilterItem = ({ label, onClear, content }) => (
  <PageHeading style={{ margin: 0 }}>
    <FilterTitle>{label}</FilterTitle>
    {content || (
      <ButtonIconDanger
        tooltip="Reset"
        onClick={onClear}
        icon={<X size="18" />}
      />
    )}
  </PageHeading>
)

// TODO: (Known bug) Changing from mobile to desktop view resets filters but query string isnt affected
const FilterContainer = ({ setLoading }) => {
  const { deleteQueryString, getQueryString, setQueryString } = useQueryString()
  const [form] = Form.useForm()

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
    setLoading(true)
    deleteQueryString('p')

    if (allFields?.credits?.[0] !== 2)
      setQueryString('credits_min', allFields.credits[0])
    else deleteQueryString('credits_min')

    if (allFields?.credits?.[1] !== 9)
      setQueryString('credits_max', allFields.credits[1])
    else deleteQueryString('credits_max')

    setQueryString('department', allFields.department)
    setQueryString('semester', allFields.semester)

    if (allFields.halfsem) setQueryString('halfsem', 'true')
    else deleteQueryString('halfsem')

    if (allFields.running) setQueryString('running', 'true')
    else deleteQueryString('running')
  }

  const semesterOptions = [
    { label: 'Autumn', value: 'autumn' },
    { label: 'Spring', value: 'spring' },
  ]

  return (
    <Form
      form={form}
      name="course_filter"
      layout="vertical"
      onValuesChange={handleFilterUpdate}
      initialValues={{
        semester: getQueryString('semester')?.split(',') ?? [],
        credits: [
          parseInt(getQueryString('credits_min') ?? 2, 10),
          parseInt(getQueryString('credits_max') ?? 9, 10),
        ],
        department: getQueryString('department')?.split(',') ?? undefined,
        halfsem: getQueryString('halfsem') === 'true',
        running: getQueryString('running') === 'true',
      }}
    >
      <FilterItem label="Semesters" onClear={handleFilterClear('semester')} />
      <Form.Item name="semester">
        <Checkbox.Group options={semesterOptions} />
      </Form.Item>

      <FilterItem
        label="Half semester only"
        onClear={handleFilterClear('halfsem')}
        content={
          <Form.Item name="halfsem" valuePropName="checked">
            <Switch />
          </Form.Item>
        }
      />

      <FilterItem
        label="Running courses only"
        onClear={handleFilterClear('running')}
        content={
          <Form.Item name="running" valuePropName="checked">
            <Switch />
          </Form.Item>
        }
      />

      <FilterItem
        label="Credits"
        onClear={handleFilterClear('credits_min', 'credits_max')}
      />
      <Form.Item name="credits">
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
          style={{ marginRight: '1rem', marginLeft: '0.5rem' }}
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
