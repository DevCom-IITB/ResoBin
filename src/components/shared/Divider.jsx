import styled from 'styled-components'

const Divider = styled.div`
  background: ${({ theme }) => theme.dividerColor};
  width: 100%;
  height: 0.5px;
  margin: ${({ margin }) => margin};
`

export default Divider
