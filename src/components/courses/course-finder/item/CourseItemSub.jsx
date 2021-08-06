import { AppleOutlined, AndroidOutlined } from '@ant-design/icons'
import { CalendarPlus } from '@styled-icons/bootstrap'
import { DocumentText, ChatAlt2 } from '@styled-icons/heroicons-outline'
import { Button, Radio, Tabs } from 'antd'
import { darken, rgba } from 'polished'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components/macro'

import { selectCourseSlotsByCourseCode } from 'store/courseSlice'
import { device } from 'styles/responsive'

const CourseItemSub = ({ code, sem }) => {
  const isRunning = useSelector(selectCourseSlotsByCourseCode(code))
  const reviewCount = 2
  const resourceCount = 2

  const onSemChange = ({ target }) => console.log(target.value)

  const semTabInitialValue = isRunning ? '1' : '2'

  return (
    <>
      <StyledTabs defaultActiveKey={semTabInitialValue}>
        <Tabs.TabPane tab="Autumn" disabled={!isRunning} key="1">
          <StyledButton
            icon={<CalendarPlus size="18" style={{ marginRight: '0.5rem' }} />}
            size="medium"
          >
            Add to autumn
          </StyledButton>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Spring" key="2">
          <StyledButton
            icon={<CalendarPlus size="18" style={{ marginRight: '0.5rem' }} />}
            size="medium"
          >
            Add to spring
          </StyledButton>
        </Tabs.TabPane>
      </StyledTabs>
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
  }

  .ant-tabs-ink-bar {
    height: 0;
    background: ${({ theme }) => theme.textColor};
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

    &-active {
      color: ${({ theme }) => theme.textColor};
      background: ${({ theme }) => theme.darksecondary};
    }

    &-disabled {
      .ant-tabs-tab-btn,
      .ant-tabs-tab-btn:active {
        color: ${({ theme }) => rgba(theme.textColor, 0.2)};
      }
    }

    &:not(.ant-tabs-tab-disabled) {
      &:hover {
        color: ${({ theme }) => darken(0.2, theme.textColor)};
      }

      &:not(.ant-tabs-tab-active):hover {
        background: ${rgba('#000000', 0.15)};
      }
    }
  }
`
