import { Pagination } from 'antd'
import { rgba } from 'polished'
import styled, { css } from 'styled-components/macro'

const baseShape = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  margin: 0 0.25rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  background-color: transparent;

  &:hover {
    background: ${({ theme }) => rgba(theme.primary, 0.1)};
  }
`

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  margin: 1rem 0;

  .ant-pagination-disabled {
    display: none;
  }

  .ant-pagination-prev,
  .ant-pagination-next {
    .ant-pagination-item-link {
      ${baseShape}

      color: ${({ theme }) => theme.primary};
      background-color: transparent;
    }
  }

  .ant-pagination-item {
    ${baseShape}

    font-weight: 600;

    &-active {
      border: 2px solid ${({ theme }) => rgba(theme.primary, 0.7)};
    }

    a {
      font-size: 1rem;
      font-weight: 600;
      color: ${({ theme }) => theme.primary};
    }
  }

  .ant-pagination-jump-next,
  .ant-pagination-jump-prev {
    ${baseShape}

    .ant-pagination-item-link-icon {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.primary};
    }

    .ant-pagination-item-ellipsis {
      position: absolute;
      top: -4px;
      right: 0;
      left: -4px;
      font-size: 0.75rem;
      color: ${({ theme }) => theme.primary};
    }
  }

  .anticon {
    display: flex;
    align-items: center;
  }
`

export default StyledPagination
