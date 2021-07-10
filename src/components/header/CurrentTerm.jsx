import styled from 'styled-components'

const Term = styled.span`
  display: flex;
  opacity: 80%;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-weight: 400;
  font-size: 1rem;
  line-height: 80%;
  white-space: nowrap;
  letter-spacing: 2px;
  color: ${({ theme }) => theme.textColor};
`

const CurrentTerm = ({ text }) => {
  return <Term>{text}</Term>
}

export default CurrentTerm
