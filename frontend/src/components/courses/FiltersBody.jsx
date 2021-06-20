import { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Checkbox } from 'components/shared'
import { filterData } from 'data/courses'
import { HEX2RGBA } from 'helpers'

const Container = styled.div`
  opacity: 80%;
  padding: 0rem 2rem 10rem;
  height: calc(100% - 8.1rem);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.75rem;
    background-color: ${({ theme }) => theme.secondary};
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    background-color: ${({ theme }) => HEX2RGBA(theme.textColor, 10)};
    border-radius: 2rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.textColorInactive};
    border-radius: 2rem;
  }
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
      {filterData.map((data, index) => (
        <Fragment key={index}>
          <Title>{data.FilterTitle}</Title>
          {/* {data.Options.map((data, index) => ()} */}
          <Checkbox label="Autumn Semester" />
          <Checkbox label="Autumn Semester" />
          <Checkbox label="Autumn Semester" />
          <Checkbox label="Autumn Semester" />
          {/* <Divider margin="0.75rem 0" />
          <CourseItem data={data} /> */}
        </Fragment>
      ))}

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
