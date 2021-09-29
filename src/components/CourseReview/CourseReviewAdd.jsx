import { Button, Comment } from 'antd'
import DOMPurify from 'dompurify'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { API } from 'api'
import StyledAvatar from 'components/shared/Avatar'
import { selectUserProfile } from 'store/userSlice'

const CourseReviewAdd = ({ visible, course, parent }) => {
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  // const handleChange = (e) => setComment(e.target.value)
  const handleChange = (value) => setComment(value)

  const profile = useSelector(selectUserProfile)

  const handleSubmit = async () => {
    setLoading(true)
    const payload = {
      course,
      parent,
      body: DOMPurify.sanitize(comment),
      status: false,
    }

    try {
      await API.reviews.create({ payload })
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
      setComment('')
    }
  }

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
  ]

  // const modules = {
  //   toolbar: [
  //     [{ header: '1' }, { header: '2' }, { font: [] }],
  //     [{ size: [] }],
  //     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  //     [
  //       { list: 'ordered' },
  //       { list: 'bullet' },
  //       { indent: '-1' },
  //       { indent: '+1' },
  //     ],
  //     ['link', 'image', 'video'],
  //     ['clean'],
  //   ],
  //   clipboard: {
  //     // toggle to add extra line breaks when pasting HTML:
  //     matchVisual: false,
  //   },
  // }

  return (
    visible && (
      <AddReviewContainer>
        <Comment
          avatar={
            <StyledAvatar
              size="2rem"
              src={profile.profilePicture}
              alt="Profile picture"
            />
          }
          content={
            <ReactQuill
              placeholder="Write a review"
              value={comment}
              onChange={handleChange}
            />
          }
        />

        <Button
          htmlType="submit"
          loading={loading}
          onClick={handleSubmit}
          type="primary"
        >
          Add Comment
        </Button>
      </AddReviewContainer>
    )
  )
}

export default CourseReviewAdd

const AddReviewContainer = styled.div`
  margin-bottom: 1rem;
  color: #000000;

  .quill {
    border: 1px solid #000000;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.textColor};
    box-shadow: 0 0 1rem 4px rgba(0, 0, 0, 0.2);
  }

  .ql-toolbar.ql-snow {
    display: block;
    border: none;
    border-bottom: 1px solid #000000;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    background: #eaecec;
  }

  .ql-container.ql-snow {
    border: none;
    border-top: 1px solid #000000;
  }

  .ql-editor {
    overflow-y: scroll;
    height: 5rem;
    resize: vertical;
  }
`
