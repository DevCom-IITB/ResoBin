import styled from 'styled-components'

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: ${({ margin }) => margin};
  background: ${({ theme }) => theme.dividerColor};
`

export default Divider
