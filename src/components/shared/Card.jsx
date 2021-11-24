import { Card, Skeleton } from 'antd'
import { rgba } from 'polished'
import styled from 'styled-components/macro'

export const StyledCard = styled(Card)`
  .ant-card-body {
    display: flex;
    border-radius: ${({ theme }) => theme.borderRadius};
    background-color: ${({ theme }) => rgba(theme.darksecondary, 0.5)};
  }

  &.ant-card-hoverable {
    transition: 100ms;

    &:hover {
      border-radius: ${({ theme }) => theme.borderRadius};
      background-color: rgba(0, 0, 0, 0.3);
    }
  }

  &.ant-card-bordered {
    border: 0;
    background-color: transparent;
  }

  .ant-card-meta {
    width: 100%;

    .ant-card-meta-title {
      font-size: 1rem;
      color: ${({ theme }) => theme.textColor};
    }

    &-description {
      font-size: 0.875rem;
      font-weight: 500;
      color: ${({ theme }) => theme.placeholder};

      b {
        font-weight: 600;
        color: ${({ theme }) => theme.logo};
      }
    }
  }

  .ant-avatar {
    width: 3rem;
    height: 3rem;
  }
`

export const CardSkeleton = styled(Skeleton)`
  display: flex;
  align-items: center;
  padding: 0.875rem 1.125rem;
  margin: 0.75rem 0;
  border-radius: 0.5rem;
  background: #1b172866;
  box-shadow: 0 0 0.5rem rgb(0 0 0 / 20%);

  .ant-skeleton-avatar {
    width: 3rem;
    height: 3rem;
  }

  .ant-skeleton-content .ant-skeleton-title {
    margin: 0;
  }
`

export default StyledCard
