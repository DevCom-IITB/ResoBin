import { useState } from 'react'
import styled from 'styled-components/macro'

const maxChars = 199

const ReadMore = ({ children: text }) => {
  const [isReadMore, setIsReadMore] = useState(true)

  if (!text || text.length < maxChars) return text
  const toggleReadMore = () => setIsReadMore(!isReadMore)

  return (
    <>
      {isReadMore ? text.slice(0, maxChars) : text}
      <ReadMoreText onClick={toggleReadMore}>
        {isReadMore ? '...show more' : ' show less'.replace(/ /g, '\u00a0')}
      </ReadMoreText>
    </>
  )
}

export default ReadMore

const ReadMoreText = styled.span`
  display: inline-block;
  margin: 0;
  font-size: 85%;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 600;
  color: gray;
  cursor: pointer;
`
