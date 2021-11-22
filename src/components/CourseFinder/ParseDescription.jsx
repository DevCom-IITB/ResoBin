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
              <Highlight key={String(index)}>{part}</Highlight>
            ) : (
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
  font-family: 'Source Sans Pro', sans-serif;
  color: ${({ theme }) => theme.textColor};
`

const ReadMoreText = styled(Span)`
  display: inline-block;
  font-size: 85%;
  font-weight: 600;
  color: ${({ theme }) => theme.textColorInactive};
  cursor: pointer;
`

const Highlight = styled.mark`
  padding: 0;
  font-family: inherit;
  font-weight: bold;
  text-decoration: underline;
  color: inherit;
  background-color: transparent;
`
