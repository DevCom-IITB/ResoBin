import { CalendarPlus } from '@styled-icons/bootstrap'
import { DocumentText, ChatAlt2 } from '@styled-icons/heroicons-outline'
import { Button, Tabs } from 'antd'
import { darken, lighten, rgba } from 'polished'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { selectCourseSlotsByCourseCode } from 'store/courseSlice'

import CourseWorkload from './CourseWorkload'

const SemesterItem = () => {
  // const { Semester } = useSelector(state => state.courseSlice)
  const contains = true

  return (
    <StyledButton
      icon={<CalendarPlus size="18" style={{ marginRight: '0.5rem' }} />}
      size="medium"
      type="primary"
      style={{ marginBottom: '1rem' }}
    >
      {contains ? 'Remove' : 'Add to timetable'}
    </StyledButton>
  )
}

const CourseItemSub = ({ courseData }) => {
  const { Code: code, Structure } = courseData
  const isRunning = useSelector(selectCourseSlotsByCourseCode(code))
  const reviewCount = 2
  const resourceCount = 2

  const semTabInitialValue = isRunning ? '1' : null

  return (
    <>
      {semTabInitialValue ? (
        <StyledTabs defaultActiveKey={semTabInitialValue}>
          <Tabs.TabPane tab="Autumn" disabled={!isRunning} key="1">
            <SemesterItem />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Spring" key="2" disabled>
            <SemesterItem />
          </Tabs.TabPane>
        </StyledTabs>
      ) : (
        <Title style={{ marginBottom: '1rem', opacity: 0.8 }}>
          Timetable entry not found
        </Title>
      )}

      <Title>Workload</Title>
      <CourseWorkload workload={Structure} />

      <StyledButton
        shape="round"
        icon={<DocumentText size="18" style={{ marginRight: '0.5rem' }} />}
        size="medium"
        // ghost
      >
        Resources ({resourceCount})
      </StyledButton>

      <StyledButton
        shape="round"
        icon={<ChatAlt2 size="18" style={{ marginRight: '0.5rem' }} />}
        size="medium"
        // ghost
      >
        Reviews ({reviewCount})
      </StyledButton>
    </>
  )
}

export default CourseItemSub

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

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 1.75rem;
  padding: 0 1rem;
  margin-top: 0.5rem;
  border: 0;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.darksecondary};

  &:active,
  &:focus {
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => theme.darksecondary};
  }

  &:hover {
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => lighten(0.4, theme.darksecondary)};
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
  }

  .ant-btn-primary {
  }
`

const Title = styled.span`
  display: block;
  margin: 0 0.25rem 0.25rem;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 1.5px;
  color: ${({ theme }) => theme.textColor};
`
