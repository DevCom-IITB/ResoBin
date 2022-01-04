import { Input } from 'antd'
import { useState } from 'react'
import styled from 'styled-components/macro'

import { DeveloperList } from 'components/Contact'
import {
  ButtonSquare,
  Form,
  PageHeading,
  PageTitle,
  toast,
} from 'components/shared'
import { API } from 'config'

const ContactContainer = () => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const handleSubmit = async (payload) => {
    try {
      setLoading(true)
      await API.feedback.share({ payload })
      toast({ status: 'success', content: 'Feedback shared successfully' })
      form.resetFields()
    } catch (error) {
      toast({ status: 'error', content: error })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHeading>
        <PageTitle>Contact us</PageTitle>
      </PageHeading>

      <StyledForm
        form={form}
        name="contact"
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name="subject"
          label="Subject"
          rules={[
            { required: true, message: 'Subject is required.' },
            { min: 3, message: 'Subject must be atleast 3 characters.' },
            { max: 100, message: 'Subject must be atmost 100 characters.' },
          ]}
        >
          <Input placeholder="Type something..." />
        </Form.Item>

        <Form.Item name="message" label="Message">
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 10 }}
            placeholder="Type something..."
            rules={[
              { max: 1000, message: 'Message must be atmost 1000 characters.' },
            ]}
          />
        </Form.Item>

        <div style={{ display: 'inline' }}>
          <ButtonSquare type="primary" htmlType="submit" loading={loading}>
            Submit
          </ButtonSquare>
        </div>
      </StyledForm>

      <DeveloperList />
    </>
  )
}

export default ContactContainer

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  background: ${({ theme }) => theme.secondary};
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgb(0 0 0 / 50%);
  margin-bottom: 1rem;
`
