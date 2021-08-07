import { Tooltip } from 'antd'
import styled from 'styled-components/macro'

import { colorPicker } from 'styles/utils'

// repeat n times a Box component with color = color
const CourseWorkloadItem = ({ value, color, title }) =>
  value <= 0 ? null : (
    <BoxContainer
      title={`${title}: ${value} hour${value > 1 ? 's' : ''} / week`}
    >
      {[...Array(value)].map((e, i) => (
        <Box key={String(i)} color={color} />
      ))}
    </BoxContainer>
  )

const CourseWorkload = ({ workload }) => {
  const workloadItems = [
    { title: 'Lecture', value: workload.Lecture },
    { title: 'Tutorial', value: workload.Tutorial },
    { title: 'Lab', value: workload.Lab },
    { title: 'Practical', value: workload.Practical },
  ].map((item) => {
    const num = parseInt(item.value, 10)
    return { ...item, value: Number.isNaN(num) ? 0 : num }
  })

  const totalWorkload = workloadItems.reduce((acc, item) => acc + item.value, 0)

  return totalWorkload > 0 ? (
    <>
      <Title>Workload</Title>
      <Container>
        {workloadItems.map(({ title, value }, idx) => (
          <CourseWorkloadItem
            key={title}
            title={title}
            value={value}
            color={colorPicker(idx)}
            style={{ marginLeft: idx > 0 ? '0' : 'initial' }}
          />
        ))}
      </Container>
    </>
  ) : (
    <Title style={{ marginBottom: '1rem', opacity: 0.8 }}>
      Workload not found
    </Title>
  )
}

export default CourseWorkload

const Container = styled.div`
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  padding: 4px;
  margin-bottom: 1rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.darksecondary};
`

const BoxContainer = styled(Tooltip)`
  display: flex;
  flex-wrap: wrap;
  height: 1.5rem;
  margin: 4px;
  border-radius: 4px;
  gap: 2px;
`

const Box = styled.div`
  width: 1rem;
  height: 100%;
  border-radius: 4px;
  background-color: ${({ color }) => color};
`

const Title = styled.span`
  display: block;
  margin: 0 0.25rem 0.25rem;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 1.5px;
  color: ${({ theme }) => theme.textColor};
`
