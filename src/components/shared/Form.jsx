import { Form } from 'antd'
import { rgba } from 'polished'
import styled from 'styled-components/macro'

const StyledForm = styled(Form)`
  display: flex;
  gap: 0.75rem;
  flex-direction: column;
  width: 100%;

  .ant-form-item {
    margin: 0;
  }

  /* Icons */
  span.anticon {
    color: white;
  }

  /* Select */
  .ant-select-clear {
    background: ${({ theme }) => theme.secondary};
  }

  .ant-select .ant-select-selection-item {
    display: flex;
    align-items: center;
  }

  .ant-select-selection-overflow-item .ant-select-selection-item {
    height: 1.5rem;
    background: ${({ theme }) => theme.darksecondary};
    border: 1px solid ${({ theme }) => rgba(theme.textColorInactive, 0.3)};
  }

  .ant-select-focused,
  .ant-select-open {
    .ant-select-selector {
      border-color: ${({ theme }) => theme.textColorInactive} !important;
      box-shadow: none !important;
    }
  }

  .ant-form-item-has-error
    :not(.ant-input-disabled):not(.ant-input-borderless).ant-input {
    background: transparent;
  }

  .ant-select .ant-select-selector,
  .ant-input {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.textColor};
    font-size: 0.75rem;
    background: transparent;
    border: none;
    border-bottom: solid 1px
      ${({ theme }) => rgba(theme.textColorInactive, 0.3)};

    &:hover,
    &:focus {
      border-color: ${({ theme }) => theme.textColorInactive};
      box-shadow: none !important;
    }
  }

  /* Checkbox */
  .ant-checkbox-wrapper {
    margin: 0;
    color: ${({ theme }) => theme.textColor};
    font-weight: 400;
    font-size: 0.75rem;
  }

  .ant-checkbox-checked {
    .ant-checkbox-inner {
      background: ${({ theme }) => theme.logo};
      border-color: ${({ theme }) => theme.logo};
    }
  }

  /* Slider */
  .ant-slider-mark {
    font-size: 0.75rem;

    span {
      color: ${({ theme }) => theme.textColor};
    }
  }

  .ant-form-item-label label {
    color: ${({ theme }) => theme.textColor};
    font-size: 0.875rem;
  }
`

export default StyledForm
