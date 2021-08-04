import { DocumentText, ChatAlt2 } from '@styled-icons/heroicons-outline'
import { Button, Badge } from 'antd'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components/macro'

// import { ButtonSquare } from 'components/shared'
import { selectCourseSlotsByCourseCode } from 'store/courseSlice'
import { device } from 'styles/responsive'

const Container = styled.div`
  display: block;
  min-width: 10rem;
  text-align: center;
`

const Title = styled.span`
  display: block;
  margin: 0 0 0.5rem;
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 1.5px;
  color: ${({ theme }) => theme.textColor};
`

const GroupBase = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 0.75rem;
  gap: 5%;
`

const SemesterGroup = styled.div`
  ${GroupBase}
`

const OptionsGroup = styled.div`
  ${GroupBase}
  /* Activate below styles between device width sm and md and also lg onwards */
  @media ${device.min.sm} and ${device.max.md}, ${device.min.xl} {
    flex-direction: column;
    justify-content: space-between;
    height: 4rem;
  }
`

const Pil = css`
  display: flex;
  opacity: ${({ active }) => (active ? '100%' : '30%')};
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 1.5rem;
  margin: 0;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.darksecondary};
  cursor: ${({ active }) => (active ? 'pointer' : 'not-allowed')};
`

const Autumn = styled.span`
  background-color: #fec400;
  ${Pil}
`

const Spring = styled.span`
  background-color: #29cc97;
  ${Pil}
`

const CourseItemSub = ({ data: courseData }) => {
  const { Semester: sem } = courseData
  const isRunning = useSelector(selectCourseSlotsByCourseCode(courseData.Code))
  const reviewCount = 2
  const resourceCount = 2

  return (
    <Container>
      <Title>Semester</Title>
      <SemesterGroup>
        <Autumn active={isRunning}>Autumn</Autumn>
        <Spring active={sem && sem.includes('Spring')}>Spring</Spring>
      </SemesterGroup>

      <Title>Study material</Title>
      <OptionsGroup>
        <StyledButton
          // type="primary"
          shape="round"
          icon={<DocumentText size="18" style={{ marginRight: '0.5rem' }} />}
          size="medium"
          ghost
        >
          {/* <Badge count={5}> */}
          Resources ({resourceCount}){/* </Badge> */}
        </StyledButton>

        <StyledButton
          shape="round"
          // type="primary"
          icon={<ChatAlt2 size="18" style={{ marginRight: '0.5rem' }} />}
          size="medium"
          ghost
        >
          Reviews ({reviewCount})
        </StyledButton>
        {/* <ButtonSquare type="button" style={buttonStyle}>
          Resources
        </ButtonSquare> */}
      </OptionsGroup>
    </Container>
  )
}

export default CourseItemSub

const StyledButton = styled(Button)`
  display: flex;

  /* justify-content: center; */
  align-items: center;
  width: 8.25rem;
  height: 1.75rem;
  padding: 0 1rem;
  border: 2px solid ${({ theme }) => theme.textColorInactive};
  color: ${({ theme }) => theme.textColorInactive};

  &:hover {
    border: 2px solid ${({ theme }) => theme.textColor};
    color: ${({ theme }) => theme.textColor};

    /* background: #0000003e; */
  }
`
