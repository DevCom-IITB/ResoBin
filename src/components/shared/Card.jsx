import { Card, Skeleton } from 'antd'
import { rgba } from 'polished'
import styled from 'styled-components/macro'

export const CardSkeleton = styled(Skeleton)`
  display: flex;
  align-items: center;
  margin: 0.75rem 0;
  padding: 0.875rem 1.125rem;
  background: #1b172866;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 0 0.5rem rgb(0 0 0 / 20%);

  .ant-skeleton-avatar {
    width: 3rem;
    height: 3rem;
  }

  .ant-skeleton-content .ant-skeleton-title {
    margin: 0;
  }
`

export const StyledCard = styled(Card)`
  .ant-card-body {
    display: flex;
    background-color: ${({ theme }) => rgba(theme.darksecondary, 0.5)};
    border-radius: ${({ theme }) => theme.borderRadius};
  }

  &.ant-card-hoverable {
    transition: 100ms;

    &:hover {
      background-color: rgb(0 0 0 / 30%);
      border-radius: ${({ theme }) => theme.borderRadius};
    }
  }

  &.ant-card-bordered {
    background-color: transparent;
    border: 0;
  }

  .ant-card-meta {
    width: 100%;

    .ant-card-meta-title {
      color: ${({ theme }) => theme.textColor};
      font-size: 1rem;
    }

    &-description {
      color: ${({ theme }) => theme.placeholder};
      font-weight: 500;
      font-size: 0.875rem;

      b {
        color: ${({ theme }) => theme.logo};
        font-weight: 600;
      }
    }
  }

  .ant-avatar {
    width: 3rem;
    height: 3rem;
  }
`

export default StyledCard
