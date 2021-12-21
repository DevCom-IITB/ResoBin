import { Comment } from 'antd'
import styled from 'styled-components/macro'

const StyledComment = styled(Comment)`
  .ant-comment-avatar {
    cursor: default;
  }

  .ant-comment-actions {
    display: flex;
    align-items: center;
    height: 1.75rem;
  }
`

export default StyledComment
