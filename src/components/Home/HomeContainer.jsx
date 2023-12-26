// import { Empty } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

// import { CourseSearch } from 'components/CourseFinder'
// import { QuickReviewContainer } from 'components/QuickReview'
import { Card, toast } from 'components/shared'
import { AsideHeader } from 'components/shared/Aside'
import { PageHeading, PageTitle } from 'components/shared/Layout'
import { API } from 'config/api'
import { coursePageUrl } from 'helpers'

const HomeItem = ({ course, hash }) => {
  const { code, title } = course

  return (
    <Link to={coursePageUrl(code, title, hash)}>
      <Card hoverable style={{ display: 'inline-block' }}>
        <Card.Meta title={code} description={title} />
      </Card>
    </Link>
  )
}

const HomeContainer = () => {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [favCourseData, setFavCourseData] = useState([])

  useEffect(() => {
    const fetchFavCourses = async () => {
      // copy this into homepage
      try {
        setLoading(true)
        const response = await API.profile.favorites()
        setFavCourseData(response.results)
      } catch (error) {
        toast({ status: 'error', content: error })
      } finally {
        setLoading(false)
      }
    }
    const fetchStats = async () => {
      try {
        setLoading(true)
        const response = await API.stats.list()
        setStats(response)
      } catch (error) {
        toast({ status: 'error', content: error })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    fetchFavCourses()
  }, [])

  return (
    <>
      <PageHeading>
        <PageTitle>Home</PageTitle>
      </PageHeading>

      {/* <CourseSearch
        loading={loading}
        setLoading={setLoading}
      /> */}

      <Container>
        <StatsContainer>
          <AsideHeader title="My Favourites" loading={loading} />

          <Flex>
            {favCourseData.length !== 0 ? (
              favCourseData?.map((course) => (
                <HomeItem key={course.code} course={course} />
              ))
            ) : (
              <NoFavDiv>{!loading && 'No favourite Courses'}</NoFavDiv>
            )}
          </Flex>
          <AsideHeader title="Most Favourites" loading={loading} />

          <Flex>
            {stats?.courses?.popular?.map((course) => (
              <HomeItem key={course.code} course={course} />
              // console.log(course)
            ))}
          </Flex>
        </StatsContainer>

        {/* <ReviewContainer>
          <AsideHeader title="Quick Review" loading={loading} />
          <QuickReviewContainer />
        </ReviewContainer> */}
      </Container>

      {/* <Aside title="Feed">
        <Empty description={<PageSubtitle>Coming soon!</PageSubtitle>} />
      </Aside> */}
    </>
  )
}

export default HomeContainer

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
`

// const ReviewContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
//   padding: 1rem;
//   background: ${({ theme }) => theme.secondary};
//   border-radius: ${({ theme }) => theme.borderRadius};
//   width: 80%;
//   margin: auto;
// `

const Flex = styled.div`
  display: flex;
  flex-basis: 100%;
  gap: 0.5rem;
  overflow-x: scroll;
`
const NoFavDiv = styled.div`
  color: #302718;
  font-size: 1rem;
  font-weight: 500;
`
