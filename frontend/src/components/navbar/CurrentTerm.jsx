import styled from 'styled-components'

const Term = styled.h4`
  font-weight: 300;
  font-size: 1.25rem;
  line-height: 80%;
  white-space: nowrap;
  opacity: 80%;
  letter-spacing: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CurrentTerm = ({ text }) => {
  return <Term>{text}</Term>
}

export default CurrentTerm
