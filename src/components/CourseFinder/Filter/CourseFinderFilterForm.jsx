import { X } from '@styled-icons/heroicons-outline'
import { Checkbox, Select, Slider, Switch } from 'antd'
import { kebabCase } from 'lodash'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { Form, PageHeading } from 'components/shared'
import { ButtonIconDanger } from 'components/shared/Buttons'
import tags from 'data/tags.json'
import { useQueryString } from 'hooks'
import { selectDepartments } from 'store/courseSlice'

const CourseFinderFilterItem = ({ label, onClear, content }) => (
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
const CourseFinderFilterForm = ({ setLoading }) => {
  const { deleteQueryString, getQueryString, setQueryString } = useQueryString()
  const [form] = Form.useForm()

  const handleFilterClear = (formField, qsFields) => () => {
    const defaultInitialValues = {
      semester: [],
      credits: [2, 9],
      halfsem: false,
      running: false,
      department: [],
      tags: [],
    }

    form.setFieldsValue({
      [formField]: defaultInitialValues[formField],
    })

    deleteQueryString(...qsFields, 'p')
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
    setQueryString('tags', allFields.tags)

    if (allFields.halfsem) setQueryString('halfsem', 'true')
    else deleteQueryString('halfsem')

    if (allFields.running) setQueryString('running', 'true')
    else deleteQueryString('running')
  }

  const semesterOptions = [
    { label: 'Autumn', value: 'autumn' },
    { label: 'Spring', value: 'spring' },
  ]

  const departmentOptions = useSelector(selectDepartments)?.map(
    (department) => ({
      label: department.name,
      value: department.slug,
    })
  )

  const tagOptions = tags.courseTags.map((tag) => ({
    label: tag,
    value: kebabCase(tag),
  }))

  return (
    <Form
      form={form}
      name="course_filter"
      layout="vertical"
      onValuesChange={handleFilterUpdate}
      initialValues={{
        semester: getQueryString('semester')?.split(',') ?? [],
        halfsem: getQueryString('halfsem') === 'true',
        running: getQueryString('running') === 'true',
        credits: [
          parseInt(getQueryString('credits_min') ?? 2, 10),
          parseInt(getQueryString('credits_max') ?? 9, 10),
        ],
        department: getQueryString('department')?.split(',') ?? [],
        tags: getQueryString('tags')?.split(',') ?? [],
      }}
    >
      <CourseFinderFilterItem
        label="Semesters"
        onClear={handleFilterClear('semester', ['semester'])}
      />
      <Form.Item name="semester">
        <Checkbox.Group options={semesterOptions} />
      </Form.Item>

      <CourseFinderFilterItem
        label="Half semester only"
        onClear={handleFilterClear('halfsem', ['halfsem'])}
        content={
          <Form.Item name="halfsem" valuePropName="checked">
            <Switch />
          </Form.Item>
        }
      />

      <CourseFinderFilterItem
        label="Running courses only"
        onClear={handleFilterClear('running', ['running'])}
        content={
          <Form.Item name="running" valuePropName="checked">
            <Switch />
          </Form.Item>
        }
      />

      <CourseFinderFilterItem
        label="Credits"
        onClear={handleFilterClear('credits', ['credits_min', 'credits_max'])}
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

      <CourseFinderFilterItem
        label="Departments"
        onClear={handleFilterClear('department', ['department'])}
      />
      <Form.Item name="department">
        <Select
          mode="multiple"
          options={departmentOptions}
          placeholder="Type something..."
          showArrow
        />
      </Form.Item>

      <CourseFinderFilterItem
        label="Tags"
        onClear={handleFilterClear('tags', ['tags'])}
      />
      <Form.Item name="tags">
        <Select
          mode="multiple"
          options={tagOptions}
          placeholder="Select something..."
          showArrow
        />
      </Form.Item>
    </Form>
  )
}

export default CourseFinderFilterForm

const FilterTitle = styled.span`
  display: inline-block;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.textColor};
  font-weight: 600;
  font-size: 1rem;
`
