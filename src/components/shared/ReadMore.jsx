import { useState } from 'react'
import styled from 'styled-components'

const ReadMoreText = styled.span`
  display: inline-block;
  opacity: 75%;
  margin: 0;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: inherit;
  cursor: pointer;
`

const ReadMore = ({ children }) => {
  const text = children
  const [isReadMore, setIsReadMore] = useState(true)
  const toggleReadMore = () => setIsReadMore(!isReadMore)

  return (
    <>
      {isReadMore ? text.slice(0, 490) : text}

      <ReadMoreText onClick={toggleReadMore}>
        {isReadMore ? '...read more' : ' show less'}
      </ReadMoreText>
    </>
  )
}

export default ReadMore
