import { Pagination } from 'antd'
import { rgba } from 'polished'
import styled, { css } from 'styled-components/macro'

const baseStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  margin: 0 0.25rem;
  font-size: 1rem;
  background-color: transparent;
  border: none;
  border-radius: 0.5rem;

  &:hover {
    background: ${({ theme }) => rgba(theme.primary, 0.1)};
  }
`

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;

  .ant-pagination-prev,
  .ant-pagination-next {
    display: flex;
    align-items: center;

    .ant-pagination-item-link {
      ${baseStyles}

      color: ${({ theme }) => theme.primary};
      background-color: transparent;
    }
  }

  .ant-pagination-disabled {
    display: none;
  }

  .ant-pagination-item {
    ${baseStyles}

    font-weight: 600;

    &-active {
      border: 2px solid ${({ theme }) => rgba(theme.primary, 0.7)};
    }

    a {
      color: ${({ theme }) => theme.primary};
      font-weight: 600;
      font-size: 0.875rem;
    }
  }

  .ant-pagination-jump-next,
  .ant-pagination-jump-prev {
    ${baseStyles}

    .ant-pagination-item-link-icon {
      color: ${({ theme }) => theme.primary};
      font-size: 0.75rem;
    }

    .ant-pagination-item-ellipsis {
      position: absolute;
      top: -4px;
      right: 0;
      left: -4px;
      color: ${({ theme }) => theme.primary};
      font-size: 0.75rem;
    }
  }

  .anticon {
    display: flex;
    align-items: center;
  }
`

export default StyledPagination
