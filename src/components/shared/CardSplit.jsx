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
  margin: 1rem 0;

  .ant-skeleton-content {
    padding: 1.5rem 1rem;
    background: ${({ theme }) => theme.secondary};
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem rgb(0 0 0 / 20%);
  }
`

const Container = styled.li`
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns:
    [main] 1fr
    [sub] auto;
  width: 100%;
  margin: 1rem 0;
  padding: 1rem;
  background: ${({ theme }) => theme.secondary};
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgb(0 0 0 / 40%);

  @media ${device.max.md} {
    grid-column-gap: 0;
    grid-template-rows:
      [main] 1fr
      [divider] auto
      [sub] auto;
    grid-template-columns: none;
  }
`

const MainContainer = styled.div`
  grid-area: main;
  width: 100%;
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
    width: 100%;
  }
`
