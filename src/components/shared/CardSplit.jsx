import { Skeleton } from 'antd'
import styled from 'styled-components/macro'

import { Divider } from 'components/shared'
import { useResponsive } from 'hooks'
import { device } from 'styles/responsive'

export const CardSplitSkeleton = ({ active }) =>
  active && <StyledSkeleton active />

const CardSplit = ({ main, sub, subWidth }) => {
  const { isMobile } = useResponsive()

  return (
    <Container>
      <MainContainer>{main}</MainContainer>

      {isMobile && (
        <Divider
          style={{ width: '100%', gridArea: 'divider' }}
          margin="1rem 0"
        />
      )}

      <SubContainer subWidth={subWidth}>{sub}</SubContainer>
    </Container>
  )
}

export default CardSplit

const StyledSkeleton = styled(Skeleton)`
  width: 100%;
  margin-bottom: 1rem;

  .ant-skeleton-content {
    padding: 1rem;
    background: ${({ theme }) => theme.secondary};
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: 0 0 0.7rem rgb(0 0 0 / 30%);

    @media ${device.max.xs} {
      padding: 0.75rem;
    }
  }
`

const Container = styled.li`
  display: grid;
  grid-column-gap: 1rem;
  grid-template-areas: 'main sub';
  grid-template-rows: 1fr;
  grid-template-columns: 1fr auto;
  padding: 1rem;
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 0 0.7rem rgb(0 0 0 / 30%);

  @media ${device.max.md} {
    grid-template-areas:
      'main'
      'divider'
      'sub';
    grid-template-rows: 1fr auto auto;
    grid-template-columns: 1fr;
    padding: 0.75rem;
  }
`

const MainContainer = styled.div`
  grid-area: main;
`

const SubContainer = styled.div`
  grid-area: sub;
  width: ${({ subWidth }) => subWidth};

  > div {
    width: ${({ subWidth }) => subWidth};
  }

  @media ${device.min.xs} and ${device.max.md} {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
  }

  @media ${device.max.md} {
    width: 100%;
  }
`
