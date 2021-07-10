import styled from 'styled-components'

const Term = styled.h4`
  display: flex;
  opacity: 80%;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 1.25rem;
  line-height: 80%;
  white-space: nowrap;
  letter-spacing: 4px;
`

const CurrentTerm = ({ text }) => {
  return <Term>{text}</Term>
}

export default CurrentTerm
