import { Tag } from 'antd'
import styled from 'styled-components/macro'

const StyledTag = styled(Tag)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 1.25rem;
  margin: 0;
  padding: 0 0.75rem;
  color: ${({ theme }) => theme.textColor};
  font-weight: 500;
  background: ${({ theme }) => theme.darksecondary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
`

export default StyledTag
