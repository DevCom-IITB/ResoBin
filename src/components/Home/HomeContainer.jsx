import { Empty } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import { API } from 'api'
import {
  Aside,
  LoaderAnimation,
  PageHeading,
  PageSubtitle,
  PageTitle,
  Card,
  toast,
} from 'components/shared'
import { AsideHeader } from 'components/shared/Aside'
import { coursePageUrl } from 'helpers/format'

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

  useEffect(() => {
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
  }, [])

  return (
    <>
      <PageHeading>
        <PageTitle>Popular Courses</PageTitle>
      </PageHeading>

      <LoaderAnimation disable={!loading} fixed />

      <Container>
        <StatsContainer>
          <AsideHeader title="Most favourites" loading={loading} />
          <Flex>
            {stats?.courses?.popular?.map((course) => (
              <HomeItem key={course.code} course={course} />
            ))}
          </Flex>
        </StatsContainer>

        <StatsContainer>
          <AsideHeader title="Most resource requests" loading={loading} />
          <Flex>
            {stats?.courses?.requested?.reviews?.map((course) => (
              <HomeItem key={course.code} course={course} hash="reviews" />
            ))}
          </Flex>
        </StatsContainer>

        <StatsContainer>
          <AsideHeader title="Most review requests" loading={loading} />
          <Flex>
            {stats?.courses?.requested?.resources?.map((course) => (
              <HomeItem key={course.code} course={course} hash="resources" />
            ))}
          </Flex>
        </StatsContainer>
      </Container>

      <Aside title="Feed">
        <Empty description={<PageSubtitle>Coming soon!</PageSubtitle>} />
      </Aside>
    </>
  )
}

export default HomeContainer

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.secondary};
  gap: 0.5rem;
`

const Flex = styled.div`
  display: flex;
  overflow-x: scroll;
  flex-basis: 100%;
  gap: 0.5rem;
`
