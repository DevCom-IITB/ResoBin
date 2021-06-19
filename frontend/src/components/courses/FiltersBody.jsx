// import { useState } from 'react'
import styled from 'styled-components'
import { Checkbox } from 'components/shared'

const Container = styled.div`
  opacity: 80%;
`

const Title = styled.h1`
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 20px;
  letter-spacing: 0.2px;
  margin: 2rem 0 1rem;
`

const FiltersBody = () => {
  return (
    <Container>
      <Title>Offered in</Title>
      <Checkbox label="Autumn Semester" />
      <Checkbox label="Spring Semester" />

      <Title>Credits</Title>
      <Title>Level</Title>
      <Title>Department</Title>
    </Container>
  )
}

export default FiltersBody
