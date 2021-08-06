import { CalendarPlus } from '@styled-icons/bootstrap'
import { DocumentText, ChatAlt2 } from '@styled-icons/heroicons-outline'
import { Button, Tabs, Tooltip } from 'antd'
import { darken, rgba } from 'polished'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { selectCourseSlotsByCourseCode } from 'store/courseSlice'
import { colorPicker } from 'styles/utils'

// repeat n times a Box component with color = color
const Plot = ({ value, color, title }) => {
  return null(
    <BoxContainer
      title={`${title}: ${value} hour${value > 1 ? 's' : ''} / week`}
    >
      {[...Array(value)].map((e, i) => (
        <Box key={String(i)} color={color} />
      ))}
    </BoxContainer>
  )
}

// const BoxContainer = styled(Tooltip)`
// `

const Container = styled(Tooltip)`
  display: flex;
  height: 1.5rem;
  border-radius: 4px;
  background: ${({ theme }) => theme.darksecondary};
  gap: 2px;
`

const BoxContainer = styled(Tooltip)`
  display: flex;
  height: calc(100% - 8px);
  margin: 4px;
  border-radius: 4px;
  background: ${({ theme }) => theme.darksecondary};
  gap: 2px;
`

const SemesterItem = ({ title: semesterTitle, workload }) => {
  const workloadItems = [
    { title: 'Lecture', value: workload.Lecture },
    { title: 'Tutorial', value: workload.Tutorial },
    { title: 'Lab', value: workload.Lab },
    { title: 'Practical', value: workload.Practical },
  ]

  return (
    <>
      <Title>Workload</Title>
      <Container style={{ flexDirection: 'column', margin: '1rem 0' }}>
        {workloadItems.map(({ title, value }, idx) => (
          <Plot
            key={title}
            title={title}
            value={parseInt(value, 10)}
            color={colorPicker(idx)}
          />
        ))}

        {/* {Plot({ n: workload.Lecture, title: 'Lecture', color: colorPicker(1) })}
        {Plot({
          n: workload.Tutorial,
          title: 'Tutorial',
          color: colorPicker(2),
        })}
        {Plot({
          n: workload.Practical,
          title: 'Practical',
          color: colorPicker(3),
        })}
        {Plot({
          n: workload.Selfstudy,
          title: 'Selfstudy',
          color: colorPicker(4),
        })} */}
      </Container>
      <StyledButton
        icon={<CalendarPlus size="18" style={{ marginRight: '0.5rem' }} />}
        size="medium"
      >
        Add to {semesterTitle}
      </StyledButton>
    </>
  )
}

const Box = styled.div`
  width: 1rem;
  height: 100%;
  border-radius: 4px;
  background-color: ${({ color }) => color};
`

const Title = styled.span`
  display: block;
  margin: 0 0 0.25rem;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 1.5px;
  color: ${({ theme }) => theme.textColor};
`

const CourseItemSub = ({ courseData }) => {
  const { Code: code, Structure } = courseData
  const isRunning = useSelector(selectCourseSlotsByCourseCode(code))
  const reviewCount = 2
  const resourceCount = 2

  const semTabInitialValue = isRunning ? '1' : '2'

  return (
    <>
      {semTabInitialValue ? (
        <StyledTabs defaultActiveKey={semTabInitialValue}>
          <Tabs.TabPane tab="Autumn" disabled={!isRunning} key="1">
            <SemesterItem title="Autumn" workload={Structure} />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Spring" key="2">
            <SemesterItem title="Spring" workload={Structure} />
          </Tabs.TabPane>
        </StyledTabs>
      ) : (
        'Not Available'
      )}

      <StyledButton
        shape="round"
        icon={<DocumentText size="18" style={{ marginRight: '0.5rem' }} />}
        size="medium"
        ghost
      >
        Resources ({resourceCount})
      </StyledButton>

      <StyledButton
        shape="round"
        icon={<ChatAlt2 size="18" style={{ marginRight: '0.5rem' }} />}
        size="medium"
        ghost
      >
        Reviews ({reviewCount})
      </StyledButton>
    </>
  )
}

export default CourseItemSub

const StyledButton = styled(Button)`
  display: flex;

  /* justify-content: center; */
  align-items: center;
  width: 100%;
  height: 1.75rem;
  padding: 0 1rem;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.textColorInactive};

  /* border: 2px solid ${({ theme }) => theme.textColorInactive}; */

  &:hover {
    border: 2px solid ${({ theme }) => theme.textColor};
    color: ${({ theme }) => theme.textColor};
  }
`

const StyledTabs = styled(Tabs)`
  color: ${({ theme }) => theme.textColor};

  .ant-tabs-nav {
    height: 1.75rem;
    margin-bottom: 0.5rem;

    .ant-tabs-ink-bar {
      height: 3px;
      background: ${({ theme }) => theme.textColor};
    }
  }

  .ant-tabs-tab {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5rem;
    padding: 0;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    font-size: 0.75rem;

    & + .ant-tabs-tab {
      margin: 0;
    }

    .ant-tabs-tab-btn {
      color: ${({ theme }) => theme.textColor};
    }

    /* Disabled button */
    &.ant-tabs-tab-disabled {
      .ant-tabs-tab-btn,
      .ant-tabs-tab-btn:active {
        color: ${({ theme }) => rgba(theme.textColor, 0.2)};
      }
    }

    /* Normal button */
    &:not(.ant-tabs-tab-disabled) {
      &:hover {
        color: ${({ theme }) => darken(0.2, theme.textColor)};
      }

      &.ant-tabs-tab-active {
        color: ${({ theme }) => theme.textColor};
        background: ${({ theme }) => theme.darksecondary};
      }

      &:not(.ant-tabs-tab-active):hover {
        background: ${rgba('#000000', 0.15)};
      }
    }
  }
`
