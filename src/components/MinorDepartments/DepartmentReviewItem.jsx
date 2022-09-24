import DOMPurify from 'dompurify'
import styled from 'styled-components/macro'

import {
  Comment,
  Timestamp,
} from 'components/shared'



// TODO: Add icons to actions
// TODO: Improve styling for mobile view
const DepartmentReviewItem = ({ content, depth }) => {


  return (
    <Comment
      key={content?.id}
      author={<CommentHeader>{content?.author}</CommentHeader>}
      content={
          <CommentText
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(content?.body),
            }}
          />
      }
      datetime={<Timestamp time={content.timestamp} />}
    />
  )
}

export default DepartmentReviewItem


const CommentHeader = styled.h2`
  color: ${({ theme }) => theme.textColor};
  font-weight: 600;
  font-size: 0.75rem;

  &:hover {
    color: ${({ theme }) => theme.textColor};
  }
`

const CommentText = styled.div`
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.textColor};

  a {
    color: ${({ theme }) => theme.primary};

    &:hover {
      text-decoration: underline;
    }
  }
`
