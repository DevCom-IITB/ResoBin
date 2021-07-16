import { Skeleton } from 'antd'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
  color: #ffffff;
`

const Title = styled.h2`
  margin: 0 0 30px 0;
  text-align: center;
`

const CourseNotFound = () => {
  const { loading } = useSelector((state) => state.course)

  return loading ? (
    <Skeleton active />
  ) : (
    <Container>
      <Title>
        <h1>Course Not Found</h1>
      </Title>
      <p>
        We couldn&rsquo;t find the course you were looking for. Please try a
        different search or contact us if you think this is an error.
      </p>
    </Container>
  )
}

export default CourseNotFound
