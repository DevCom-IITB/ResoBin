import { Tooltip } from 'antd'
import styled from 'styled-components/macro'

import { colorPicker } from 'styles/utils'

// repeat n times a Box component with color = color
const CourseWorkloadItem = ({ value, color, title }) => {
  if (Number.isNaN(value) || value <= 0) return null

  return (
    <BoxContainer
      title={`${title}: ${value} hour${value > 1 ? 's' : ''} / week`}
    >
      {[...Array(value)].map((e, i) => (
        <Box key={String(i)} color={color} />
      ))}
    </BoxContainer>
  )
}

const CourseWorkload = ({ workload }) => {
  const workloadItems = [
    { title: 'Lecture', value: workload.Lecture },
    { title: 'Tutorial', value: workload.Tutorial },
    { title: 'Lab', value: workload.Lab },
    { title: 'Practical', value: workload.Practical },
  ]

  return (
    <Container>
      {workloadItems.map(({ title, value }, idx) => (
        <CourseWorkloadItem
          key={title}
          title={title}
          value={parseInt(value, 10)}
          color={colorPicker(idx)}
          style={{ marginLeft: idx > 0 ? '0' : 'initial' }}
        />
      ))}
    </Container>
  )
}

export default CourseWorkload

const Box = styled.div`
  width: 1rem;
  height: 100%;
  border-radius: 4px;
  background-color: ${({ color }) => color};
`

const BoxContainer = styled(Tooltip)`
  display: flex;
  margin: 4px;
  border-radius: 4px;
  gap: 2px;
`

const Container = styled.div`
  display: flex;
  height: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  background: ${({ theme }) => theme.darksecondary};
`
