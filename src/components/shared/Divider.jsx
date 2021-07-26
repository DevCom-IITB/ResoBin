import styled from 'styled-components/macro'

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  margin: ${({ margin }) => margin};
  background: ${({ theme }) => theme.dividerColor};
`

export default Divider
