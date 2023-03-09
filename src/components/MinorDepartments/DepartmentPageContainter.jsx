import { Empty } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import { Aside, PageSubtitle, Tabs, Divider, Card } from 'components/shared'
import { AsideHeader } from 'components/shared/Aside'
import { coursePageUrl } from 'helpers'
import { device, fontSize } from 'styles/responsive'

import DepartmentReviewContainer from './DepartmentReviewContainer'




const DepartmentPageContainer = ({ departmentData, departmentReviews }) => {


  const location = useLocation()
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState(null)


  const handleTabChange = (key) => {
    location.hash = key
    navigate(location, { replace: true })
  }

  useEffect(() => {

    setActiveKey(location.hash.split('#')[1] ?? 'reviews')

  }, [location.hash])

  return (
    <>
      <DepartmentPageBody>
        <DepartmentInfo>
          <h1>{departmentData.department.name}</h1>


          <Divider margin="0.25rem 0" />

          <p>{departmentData.description || 'Not available'}</p>
        </DepartmentInfo>

        <Divider margin="0.75rem 0" />
      </DepartmentPageBody>

      <Container>
        <StatsContainer>
        <AsideHeader title="Basket Courses" />
        <Flex>
          {departmentData?.basket?.map((course) => {
            const [code, title] = course.split(": ")
            return (
              <Link to={coursePageUrl(code, title, "reviews")} key={code}>
                <Card hoverable style={{ display: 'inline-block' }}>
                  <Card.Meta title={code} description={title} />
                </Card>
              </Link>
            )
          })}
        </Flex>
        </StatsContainer>
      </Container>

      <Container>
        <Tabs
          tabheight="2.25rem"
          tabwidth="7.5rem"
          animated
          activeKey={activeKey}
          onChange={handleTabChange}
        >
          <Tabs.TabPane
            key="reviews"
            tab={departmentReviews?.length ? `Reviews (${departmentReviews.length})` : `Reviews`}
          >
            <DepartmentReviewContainer />
          </Tabs.TabPane>
        </Tabs>
      </Container>

      <Aside title="Course stats">
        <Empty description={<PageSubtitle>Coming soon!</PageSubtitle>} />
      </Aside>
    </>
  )
}

export default DepartmentPageContainer

const Container = styled.div`
  margin-bottom: 1rem;
  padding: 1.5rem 1rem;
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
`

const DepartmentPageBody = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  padding: 1.5rem 1rem;
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};

  @media ${device.max.xs} {
    margin-top: 0.75rem;
    padding: 0.75rem;
  }
`

const DepartmentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: ${({ theme }) => theme.textColor};

  h1 {
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
    font-size: ${fontSize.responsive.$4xl};
    line-height: 1;
  }

  h2 {
    font-size: ${fontSize.responsive.xl};
  }

  h3 {
    display: flex;
    font-weight: 400;
    font-size: ${fontSize.responsive.xs};
  }

  p {
    margin: 0;
    font-weight: 300;
    font-size: ${fontSize.responsive.sm};
    font-family: 'Source Sans Pro', sans-serif;
    text-align: justify;
  }
`




const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
`
const Flex = styled.div`
  display: flex;
  flex-basis: 100%;
  gap: 0.5rem;
  overflow-x: scroll;
`
