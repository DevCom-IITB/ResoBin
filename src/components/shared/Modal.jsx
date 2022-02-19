import { Modal } from 'antd'
import styled from 'styled-components/macro'

const StyledModelWithMask = (props) => (
  <StyledModal
    maskStyle={{
      backdropFilter: 'blur(0.75rem)',
      background: 'rgba(0, 0, 0, 0.5)',
    }}
    {...props}
  />
)

export default StyledModelWithMask

const StyledModal = styled(Modal)`
  color: ${({ theme }) => theme.textColor};
  box-shadow: 0 2px 10px rgb(0 0 0 / 10%), 0 10px 15px rgb(0 0 0 / 20%);
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  padding: 0;

  .ant-modal-content {
    background: ${({ theme }) => theme.secondary};

    .ant-modal-close {
      color: ${({ theme }) => theme.textColor};

      &:hover {
        background: ${({ theme }) => theme.secondary};
      }
    }
  }

  .ant-modal-header {
    background: ${({ theme }) => theme.darksecondary};
    border-bottom: 2px solid ${({ theme }) => theme.placeholder};

    .ant-modal-title {
      color: ${({ theme }) => theme.textColor};
    }
  }
`
