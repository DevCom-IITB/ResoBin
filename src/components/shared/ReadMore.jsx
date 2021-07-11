import { useState } from 'react'
import styled from 'styled-components'

const ReadMoreText = styled.span`
  display: inline-block;
  margin: 0;
  font-weight: 600;
  font-size: 85%;
  font-family: 'Source Sans Pro', sans-serif;
  color: gray;
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
      <ReadMoreText onClick={toggleReadMore}>
        {isReadMore ? '...show more' : ' show less'.replace(/ /g, '\u00a0')}
      </ReadMoreText>
    </>
  )
}

export default ReadMore
