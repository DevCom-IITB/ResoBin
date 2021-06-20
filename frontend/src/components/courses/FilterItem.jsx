import { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Divider, Checkbox } from 'components/shared'

const Title = styled.h1`
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 20px;
  letter-spacing: 0.2px;
  margin: 2rem 0 1rem;
`

const Container = styled.div`
  /* display: inline-block; */
  /* display: grid;
  grid-template-columns: repeat(12, 3rem); */
  /* column-count: 3;
  column-gap: 0.5rem; */
  margin: 0.5rem 0.5rem 0.5rem 0;
`

const FilterItem = ({ data, index }) => {
  return (
    <Fragment key={index}>
      <Title>{data.FilterTitle}</Title>
      <Container>
        {data.Options.map((data, index) => (
          <Checkbox key={index} label={data.Label} />
        ))}
      </Container>
      <Divider margin="0.75rem 0" />
    </Fragment>
  )
}

export default FilterItem
