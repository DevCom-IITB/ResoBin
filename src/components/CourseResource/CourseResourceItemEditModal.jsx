import { Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Modal, toast } from 'components/shared'
import { API } from 'config/api'
import tags from 'data/tags.json'
import { selectCourseListMinified } from 'store/courseSlice'

const CourseResourceItemEditModal = ({
  visible,
  onEdit,
  onCancel,
  initialValues,
}) => {

  const [profList, setProfList] = useState([{value: "null", label: "don't know"}])
  const [moduleList, setModuleList] = useState([{value: "null", label: "don't know"}])
  const currentYear = new Date().getFullYear()
  const yearsAllowed = [{value: 0, label: "don't know"}, {value: currentYear-2, label: currentYear-2}, {value: currentYear-1, label: currentYear-1}, {value: currentYear, label: currentYear}]

  const [form] = Form.useForm()

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      onEdit(values)
    } catch (error) {
      toast({ status: 'error', content: 'Check your inputs' })
    }
  }

  const tagOptions = tags.resourceTags.map((tag) => ({
    label: tag,
    value: tag,
  }))

  const courseOptions = useSelector(selectCourseListMinified)?.map(
    ({ code, title }) => ({
      label: `${code}: ${title}`,
      value: code,
    })
  )

  

  const handleCourseChange = (course_) => {
    const fetchProfs = async () => {
      const profSet = await API.professors.read({code: course_})      
          // assert that a course definitely has profs associated with it
      const profSetFormat = [{value: "null", label: "don't know"}]
      const moduleSetFormat = [{value: "null", label: "don't know"}]
      profSet.professors?.forEach((entry) => {
        profSetFormat.push({value: entry, label: entry})
      })
      if(profSet.modules.length !== 0){
        profSet.modules?.forEach((entry) => {
          moduleSetFormat.push({value: entry, label: entry})
        })
      }
      setModuleList(moduleSetFormat)
      setProfList(profSetFormat)
    }
    fetchProfs()
  }  

  useEffect(() => {
    const course12 = initialValues.course
    handleCourseChange(course12)
  }, [])


  return (
    <Modal
      visible={visible}
      title="Edit your upload"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form
        form={form}
        layout="vertical"
        name="editResource"
        initialValues={initialValues}
        onFinish={onEdit}
      >

        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Title is necessary',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="course"
          label="Course"
          rules={[
            {
              required: true,
              message: 'Course is necessary',
            },
          ]}
        >
          <Select showSearch placeholder="Course" options={courseOptions} onChange={handleCourseChange} />
        </Form.Item>        

        <Form.Item
          name="modules"        
          rules={[{required: true, message: 'This is a required field.' }]}
        >       
        
          <Select showSearch placeholder="Module" options={moduleList} />         
        </Form.Item>
        
        <Form.Item
          name="author"
          rules={[{required: true, message: 'This is a required field.' }]}
        >        
          {/* <Select showSearch placeholder="Professor" options={profList} value={selectedProf} onChange={setSelectedProf}/> */}
        <Select showSearch placeholder="Professor" options={profList} />
        </Form.Item>

        <Form.Item
          name="year"
          rules={[{required: true, message: 'This is a required field.' }]}
        >
          <Select showSearch placeholder="Year" options={yearsAllowed} />
       </Form.Item>   

       <Form.Item 
          name="tags"
          rules={[{required: true, message: 'This is a required field. Select the applicable tags.' }]}  
        >
          <Select
            mode="multiple"
            placeholder="Add tags"
            showArrow                  
            options={tagOptions}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CourseResourceItemEditModal
