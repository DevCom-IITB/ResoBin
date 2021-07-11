import { useState } from 'react'
import styled from 'styled-components'

const ReadMoreText = styled.span`
  display: inline-block;
  opacity: 65%;
  margin: 0;
  font-weight: 600;
  font-size: 70%;
  font-family: 'Source Sans Pro', sans-serif;
  text-decoration: underline;
  text-transform: uppercase;
  text-underline-offset: 1px;
  letter-spacing: 1px;
  color: inherit;
  cursor: pointer;
`

const ReadMore = ({ children }) => {
  const text = children
  const [isReadMore, setIsReadMore] = useState(true)
  const toggleReadMore = () => setIsReadMore(!isReadMore)
  const maxChars = 199

  return text.length < maxChars ? (
    <>{text}</>
  ) : (
    <>
      {isReadMore ? text.slice(0, maxChars) : text}
      &nbsp;&nbsp;
      <ReadMoreText onClick={toggleReadMore}>
        {isReadMore ? 'show more' : 'show less'.replace(/ /g, '\u00a0')}
      </ReadMoreText>
    </>
  )
}

export default ReadMore
