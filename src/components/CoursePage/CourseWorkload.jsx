import { Tooltip } from 'antd'
import styled from 'styled-components/macro'

import { hash } from 'helpers'
import { useColorPicker } from 'hooks'
import { device } from 'styles/responsive'

// ? repeat n times a Box component with color = color
const CourseWorkloadItem = ({ value, color, title }) =>
  value <= 0 ? null : (
    <BoxContainer
      title={`${title}: ${value} hour${value > 1 ? 's' : ''} / week`}
    >
      {[...Array(value)].map((e, i) => (
        <Box key={`c${String(i)}`} color={color} />
      ))}
    </BoxContainer>
  )

const CourseWorkload = ({ workload }) => {
  const colorPicker = useColorPicker()

  const workloadItems = [
    {
      title: 'Lecture',
      value: workload == null ? 0 : workload.lecture,
    },
    { title: 'Tutorial', value: workload == null ? 0 : workload.tutorial },
    { title: 'Lab', value: workload == null ? 0 : workload.selfstudy },
    { title: 'Practical', value: workload == null ? 0 : workload.practical },
  ].map((item) => {
    const num = parseInt(item.value, 10)
    return { ...item, value: Number.isNaN(num) ? 0 : num }
  })

  const totalWorkload = workloadItems.reduce((acc, item) => acc + item.value, 0)

  if (totalWorkload === 0)
    return <Title style={{ opacity: 0.8 }}>Workload not found</Title>

  return (
    <Container>
      <Title>Workload</Title>
      <WorkloadContainer>
        {workloadItems.map(({ title, value }, idx) => (
          <CourseWorkloadItem
            key={title}
            title={title}
            value={value}
            color={colorPicker(hash(idx))}
            style={{ marginLeft: idx > 0 ? '0' : 'initial' }}
          />
        ))}
      </WorkloadContainer>
    </Container>
  )
}

export default CourseWorkload

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.max.xs} {
    align-items: center;
  }
`

const WorkloadContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 10rem;
  padding: 4px;
  overflow: auto;
  background: ${({ theme }) => theme.darksecondary};
  border-radius: 10px;
`

const BoxContainer = styled(Tooltip)`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  height: 1.5rem;
  margin: 4px;
  border-radius: 4px;
`

const Box = styled.div`
  width: 1rem;
  height: 100%;
  background: ${({ color }) => color};
  border-radius: 4px;
`

const Title = styled.h3`
  margin: 0 0.25rem 0.25rem;
  color: ${({ theme }) => theme.textColor};
  font-weight: 400;
`
