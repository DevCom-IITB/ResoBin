import { useState } from 'react'
import styled from 'styled-components'

const ReadMoreText = styled.span`
  color: inherit;
  opacity: 75%;
  font-weight: 600;
  letter-spacing: 0.75px;
  cursor: pointer;
`

const ReadMore = ({ children }) => {
  let text = children
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
