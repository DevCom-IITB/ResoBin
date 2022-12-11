import { Button, Input, Select } from 'antd'
import { kebabCase } from 'lodash'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { ButtonSquare, Form } from 'components/shared'
import { API } from 'config/api'
import tags from 'data/tags.json'
import { useQueryString } from 'hooks'
import { selectCourseListMinified } from 'store/courseSlice'

const ContributeForm = ({ fileItem, handleUpload, handleDelete }) => {
  const [profList, setProfList] = useState([])
  const [moduleList, setModuleList] = useState([])
  const currentYear = new Date().getFullYear()
  const yearsAllowed = [{value: 0, label: 0}, {value: currentYear-2, label: currentYear-2}, {value: currentYear-1, label: currentYear-1}, {value: currentYear, label: currentYear}]
  const { getQueryString } = useQueryString()
  const course = getQueryString('course')
  // const [selectedProf, setSelectedProf] = useState("")
  // const [selectedModule, setSelectedModule] = useState("")

  

  const tagOptions = tags.resourceTags.map((tag) => ({
    label: tag,
    value: kebabCase(tag),
  }))

  const courseListMinified = useSelector(selectCourseListMinified)
  const courseOptions = courseListMinified.map(({ code, title }) => ({
    label: `${code}: ${title}`,
    value: code,
  }))

  const handleCourseChange = (course_) => {
    const fetchProfs = async () => {
      const profSet = await API.professors.read({code: course_})      
          // assert that a course definitely has profs associated with it
      const profSetFormat = [{value: "null", label: "null"}]
      const moduleSetFormat = [{value: "null", label: "null"}]
      profSet.professors.forEach((entry) => {
        profSetFormat.push({value: entry, label: entry})
      })
      if(profSet.modules.length !== 0){
        profSet.modules.forEach((entry) => {
          moduleSetFormat.push({value: entry, label: entry})
        })
      }
      // setSelectedProf("")
      // setSelectedModule("")
      setModuleList(moduleSetFormat)
      setProfList(profSetFormat)
    }
    fetchProfs()
  }  

  const [form] = Form.useForm()

  return (
    <Form
      form={form}
      name="contribute"
      onFinish={handleUpload}
      layout="vertical"
      initialValues={{ ...fileItem.details, course }}
    >
      <Form.Item
        name="title"
        rules={[
          { required: true, message: 'Title is required.' },
          { min: 5, message: 'Title must be atleast 5 characters.' },
          { max: 100, message: 'Title must be atmost 100 characters.' },
        ]}
      >
        <Input placeholder="Title" />
      </Form.Item>

      <Form.Item
        name="course"
        rules={[{ required: true, message: 'This is a required field. Choose a course.' }]}
      >
        <Select showSearch placeholder="Course" options={courseOptions} onChange={handleCourseChange} />
      </Form.Item>

      <Form.Item
        name="module"        
        rules={[{required: true, message: 'This is a required field. Either choose a name or null.' }]}
      >
        
        {/* <Select showSearch placeholder="Module" options={moduleList} value={selectedModule} onChange={setSelectedModule}/> */}
        <Select showSearch placeholder="Module" options={moduleList} />         
      </Form.Item>

      <Form.Item
        name="author"
        rules={[{required: true, message: 'This is a required field. Either choose a name or null.' }]}
      >        
        {/* <Select showSearch placeholder="Professor" options={profList} value={selectedProf} onChange={setSelectedProf}/> */}
        <Select showSearch placeholder="Professor" options={profList} />
      </Form.Item>

      <Form.Item
        name="year"
        rules={[{required: true, message: 'This is a required field. Either choose a year or 0.' }]}
      >
        <Select showSearch placeholder="Year" options={yearsAllowed} />
      </Form.Item>   

      <Form.Item 
        name="tags"
        rules={[{required: true, message: 'This is a required field. Select the applicable tags.' }]}  
      >
        <Select
          mode="tags"
          placeholder="Add tags"
          showArrow
          tokenSeparators={[',']}
          options={tagOptions}
        />
      </Form.Item>

      <ButtonContainer>
        <ButtonSquare
          type="primary"
          htmlType="submit"
          loading={fileItem.status === 'uploading'}
        >
          Submit
        </ButtonSquare>

        <Button
          type="primary"
          danger
          onClick={handleDelete}
          hidden={fileItem.status === 'uploading'}
          style={{ borderRadius: '0.5rem' }}
        >
          Delete
        </Button>
      </ButtonContainer>
    </Form>
  )
}

export default ContributeForm

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`
