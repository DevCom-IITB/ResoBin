import { useState } from 'react'
import { Select } from 'antd'
import styled from 'styled-components'
import { departmentData } from 'data/courses'

const Container = styled.div``

const Title = styled.h1`
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 20px;
  letter-spacing: 0.2px;
  margin: 2rem 0 1rem;
`

const DropdownMulti = () => {
  const { Option } = Select

  const children = []
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    )
  }
  console.log(children)
  function handleChange(value) {
    console.log(`selected ${value}`)
  }

  return (
    // <Container>
    <>
      {/* <Title>Choose departments</Title> */}
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Please select"
        defaultValue={['a10', 'c12']}
        onChange={handleChange}
      >
        {children}
      </Select>
    </>
    // </Container>
  )
}

export default DropdownMulti
