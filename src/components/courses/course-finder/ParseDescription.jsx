import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

const ReadMoreText = styled.span`
  display: inline-block;
  margin: 0;
  font-size: 85%;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 600;
  color: gray;
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

const maxChars = 199

const ParseDescription = ({ children: text }) => {
  const [isReadMore, setIsReadMore] = useState(true)
  const location = useLocation()
  const queryString = new URLSearchParams(location.search)
  const search = (queryString.get('q') || '').toLowerCase()

  if (!text) return 'Not available'

  const toggleReadMore = () => setIsReadMore(!isReadMore)
  const displayText = isReadMore ? text.slice(0, maxChars) : text

  const re = new RegExp(`(${search})`, 'gi')
  const parts = displayText.split(re)

  return (
    <span>
      {search
        ? parts.map((part, index) =>
            part.toLowerCase() === search ? (
              <Highlight key={String(index)}>{part}</Highlight>
            ) : (
              <span key={String(index)}>{part}</span>
            )
          )
        : displayText}

      <ReadMoreText onClick={toggleReadMore}>
        {isReadMore ? '...show more' : '\u00a0show less'}
      </ReadMoreText>
    </span>
  )
}

export default ParseDescription
