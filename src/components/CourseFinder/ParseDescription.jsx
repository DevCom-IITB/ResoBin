import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

const maxChars = 199

const ParseDescription = ({ children: text }) => {
  const [isReadMore, setIsReadMore] = useState(true)
  const location = useLocation()
  const queryString = new URLSearchParams(location.search)
  const search = (queryString.get('q') || '').toLowerCase()

  if (!text) return <Span>Not available</Span>

  const toggleReadMore = () => setIsReadMore(!isReadMore)
  const displayText = isReadMore ? text.slice(0, maxChars) : text

  const re = new RegExp(`(${search})`, 'gi')
  const parts = displayText.split(re)

  return (
    <Span>
      {search
        ? parts.map((part, index) =>
            part.toLowerCase() === search ? (
              // eslint-disable-next-line react/no-array-index-key
              <Highlight key={String(index)}>{part}</Highlight>
            ) : (
              // eslint-disable-next-line react/no-array-index-key
              <Span key={String(index)}>{part}</Span>
            )
          )
        : displayText}

      <ReadMoreText onClick={toggleReadMore}>
        {isReadMore ? '... show more' : '\u00a0show less'}
      </ReadMoreText>
    </Span>
  )
}

export default ParseDescription

const Span = styled.span`
  color: ${({ theme }) => theme.textColor};
  font-family: 'Source Sans Pro', sans-serif;
`

const ReadMoreText = styled(Span)`
  display: inline-block;
  color: ${({ theme }) => theme.textColorInactive};
  font-weight: 600;
  font-size: 85%;
  cursor: pointer;
`

const Highlight = styled.mark`
  padding: 0;
  color: inherit;
  font-weight: bold;
  font-family: inherit;
  text-decoration: underline;
  background: transparent;
`
