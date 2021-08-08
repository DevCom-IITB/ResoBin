import { Comment, Avatar, Form, Button, Input, List } from 'antd'
import styled from 'styled-components/macro'

const Editor = ({ onChange, onSubmit, value }) => (
  <>
    <Form.Item>
      <Input.TextArea
        rows={4}
        onChange={onChange}
        value={value}
        style={{ width: '80%' }}
      />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" onClick={onSubmit} type="primary">
        Add Review
      </Button>
    </Form.Item>
  </>
)

const CommentHeader = styled.p`
  font-weight: 600;
  color: ${({ theme }) => theme.header};
`

const CommentText = styled.p`
  width: 80%;
  font-weight: 400;
  color: ${({ theme }) => theme.header};
`

const data = [
  {
    author: <CommentHeader>Elon Musk</CommentHeader>,
    avatar: (
      <Avatar
        style={{ backgroundColor: 'blueviolet' }}
        src="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F610467cb72fd5d4d82dff7c0%2FElon-Musk-Awarded-With-Axel-Springer-Award-In-Berlin%2F960x0.jpg%3FcropX1%3D0%26cropX2%3D2462%26cropY1%3D39%26cropY2%3D1680"
        alt="Elon Musk"
      />
    ),
    content: (
      <CommentText>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
        quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
        eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
        voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
        corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
        quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
        voluptas nulla pariatur?
      </CommentText>
    ),
    datetime: <CommentHeader>30-05-2021 11:09AM</CommentHeader>,
  },
  {
    author: <CommentHeader>Mark Zuckerburg</CommentHeader>,
    avatar: (
      <Avatar
        style={{ backgroundColor: 'blueviolet' }}
        src="https://techcrunch.com/wp-content/uploads/2016/11/6748ee068da54207b9169e03fdd6787f.jpeg?w=1390&crop=1"
        alt="Elon Musk"
      />
    ),
    content: (
      <CommentText>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
        quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
        eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
        voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
        corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
        quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
        voluptas nulla pariatur?
      </CommentText>
    ),
    datetime: <CommentHeader>30-05-2021 11:09AM</CommentHeader>,
  },
]

const CourseReviews = () => {
  return (
    <>
      <List
        className="comment-list"
        dataSource={data}
        renderItem={(item) => (
          <li>
            <Comment
              actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          </li>
        )}
      />
      <Comment
        avatar={
          <Avatar
            style={{ backgroundColor: 'blueviolet' }}
            src="https://bsmedia.business-standard.com/_media/bs/img/article/2020-06/20/full/1592642838-4944.jpg"
            alt="Bill Gates"
          />
        }
        content={
          // Functions to be called using states
          <Editor
            onChange={() => {}}
            onSubmit={() => {}}
            value="Write a course review"
          />
        }
      />
    </>
  )
}

export default CourseReviews
