import { Tooltip } from 'antd'
import { format, formatDistance } from 'date-fns'
import styled from 'styled-components/macro'

const Timestamp = ({ time }) => {
  return time ? (
    <Tooltip title={format(new Date(time), 'dd.MM.yyyy')}>
      <DateTitle>
        {formatDistance(new Date(time), new Date(), {
          addSuffix: true,
        })}
      </DateTitle>
    </Tooltip>
  ) : null
}

export default Timestamp

const DateTitle = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
  color: ${({ theme }) => theme.textColorInactive};
`
