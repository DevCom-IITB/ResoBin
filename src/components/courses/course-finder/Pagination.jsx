import styled, { css } from 'styled-components/macro'

const Pagination = (props) => <StyledPagination {...props} />

export default Pagination

const baseShape = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  margin: 0 0.25rem;
  border: none;
  border-radius: 0.5rem;

  &:hover {
    background: #00000030;
  }
`

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  margin: 1rem 0;

  .ant-pagination-prev,
  .ant-pagination-next {
    ${baseShape}

    .ant-pagination-item-link {
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      font-size: 1rem;
      color: inherit;
      background-color: transparent;
    }
  }

  .ant-pagination-item {
    ${baseShape}

    font-size: 1rem;
    font-weight: 600;
    background-color: transparent;

    &-active {
      background: #00000030;
    }

    a {
      font-size: 1rem;
      font-weight: 600;
      color: ${({ theme }) => theme.darksecondary};
    }
  }

  .ant-pagination-jump-next,
  .ant-pagination-jump-prev {
    ${baseShape}

    .ant-pagination-item-link-icon {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.darksecondary};
    }

    .ant-pagination-item-ellipsis {
      position: absolute;
      top: -4px;
      right: 0;
      left: -4px;
      font-size: 0.75rem;
      color: ${({ theme }) => theme.darksecondary};
    }
  }

  .ant-pagination-disabled {
    display: none;
  }
`
