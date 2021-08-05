import {
  Col,
  Divider,
  Row,
  Comment,
  Avatar,
  Form,
  Button,
  Input,
  List,
  Tabs,
} from 'antd'
import styled from 'styled-components/macro'

import { device, fontSize } from 'styles/responsive'

const CoursePageBody = ({ courseData }) => {
  // Hardcoded data to be removed
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
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur?
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
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur?
        </CommentText>
      ),
      datetime: <CommentHeader>30-05-2021 11:09AM</CommentHeader>,
    },
  ]

  return (
    <Container>
      <CourseCode>{courseData.Code}</CourseCode>
      <CourseTitle>{courseData.Title}</CourseTitle>
      <CourseDepartment>
        {courseData.Department} | {courseData.TotalCredits} credits
      </CourseDepartment>

      <Divider
        style={{ backgroundColor: '#ffffff', margin: '1rem 0', opacity: 0.3 }}
      />
      <CourseDescription>
        {courseData.Description || 'Not available'}
      </CourseDescription>

      <Row>
        <Col span={8}>
          <SubHeaderText>Course Structure</SubHeaderText>
          <CenterText>
            Lectures : {courseData.Structure.Lecture} | Tutorial:{' '}
            {courseData.Structure.Tutorial} | Practical:{' '}
            {courseData.Structure.Practical}
          </CenterText>
        </Col>
        <Col span={8}>
          <SubHeaderText>Prerequisites</SubHeaderText>
          <CenterText>{courseData.Prerequisite}</CenterText>
        </Col>
        <Col span={8}>
          <SubHeaderText>Credits</SubHeaderText>
          <CenterText>{courseData.TotalCredits}</CenterText>
        </Col>
      </Row>
      <Divider />

      <Tabs
        defaultActiveKey="1"
        centered
        size="large"
        style={{
          color: `${({ theme }) => theme.textColor}`,
          fontWeight: 600,
          fontSize: '24px',
        }}
        type="card"
      >
        <TabPane tab={`Reviews (${data.length})`} key="1">
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
        </TabPane>
        <TabPane tab="Resources" key="2">
          Resources
        </TabPane>
      </Tabs>
    </Container>
  )
}

export default CoursePageBody

const Container = styled.div`
  padding: 1.5rem 1rem;
  margin: 0 0.75rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.darksecondary};

  @media ${device.max.md} {
    margin: 1rem 0.75rem;
  }
`

const CourseCode = styled.h1`
  font-size: ${fontSize.responsive.$4xl};
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
`

const CourseTitle = styled.h1`
  font-size: ${fontSize.responsive.$2xl};
`

const CourseDepartment = styled.h3`
  margin-top: 0.5rem;
  font-size: ${fontSize.responsive.sm};
  font-weight: 400;
`

const CourseDescription = styled.p`
  font-size: ${fontSize.responsive.md};
  font-weight: 300;
  text-align: justify;
  color: lightgray;
`

const SubHeaderText = styled.div`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.textColor};
`

const CenterText = styled.h3`
  text-align: center;
`

const CommentHeader = styled.p`
  font-weight: 600;
  color: ${({ theme }) => theme.header};
`

const CommentText = styled.p`
  width: 80%;
  font-weight: 400;
  color: ${({ theme }) => theme.header};
`
const { TextArea } = Input

const Editor = ({ onChange, onSubmit, value }) => (
  <>
    <Form.Item>
      <TextArea
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

const { TabPane } = Tabs

// Sample data

// Code: "AE 152"
// Department: "Aerospace Engineering"
// Description: "Nomenclature of aircraft components. Standard atmosphere. Basic Aerodynamics : Streamlines, steady fluid motion, incompressible flow, Bernoulli\"s equation,Mach number, Pressure and airspeed measurement, Boundary Layer,Reynolds number, Laminar and Turbulent flow. Airfoils and wings: pressure coefficient and lift calculation, Critical Mach number, Wave drag, Finite wings, Induced drag, Swept wings. Aircraft performance: steady level flight, Altitude effects, Absolute ceiling, steady climbing flight, Energy methods, Range and Endurance, Sustained level turn, pull-up, V-n diagram, Take off and landing. Reentry vehicles: Ballistic and Glide Reentry, Blunt body concept."
// LastUpdate: "01-12-2015"
// Prerequisite: "Nil"
// Structure: {Type: "T", Lecture: "2", Tutorial: "0", Practical: "1", Selfstudy: "0", …}
// TextReference: "Ojha S.K., Flight Performance of Aircraft, AIAA Series, 1995.Anderson, J.D., Introduction to Flight, McGraw Hill, 1989. Hale, J.F., Introduction to Aircraft Performance, Selection and Design, John Wiley, 1984."
// Title: "Introduction to Aerospace Engg."
// TotalCredits: "6"
// id: 1002
