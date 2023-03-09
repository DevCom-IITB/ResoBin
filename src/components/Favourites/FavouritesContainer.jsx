import { Empty } from 'antd'
import { useState, useEffect } from 'react'

import { CourseList, CourseSearch } from 'components/CourseFinder'
import { Aside, PageSubtitle, toast } from 'components/shared'
import { API } from 'config/api'
import { useQueryString } from 'hooks'

const FavouritesContainer = () => {
  const { getQueryString } = useQueryString()

  const [loading, setLoading] = useState(true)
  const [courseData, setCourseData] = useState([])

  const fetchCourses = async (params) => {    // copy this into homepage
    try {
      setLoading(true)
      const response = await API.profile.favorites({ params })
      setCourseData(response)
    } catch (error) {
      toast({ status: 'error', content: error })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const filter = getQueryString()
    const params = {
      q: filter.q,
      search_fields: 'code,title,description',
      page: filter.p,
    }

    fetchCourses(params)
  }, [getQueryString])

  return (
    <>
      <CourseSearch
        loading={loading}
        setLoading={setLoading}
        showFilter={false}
      />

      <CourseList
        title="Favourites"
        count={courseData.count}
        courseList={courseData.results}
        loading={loading}
        setLoading={setLoading}
      />

      <Aside title="My contributions">
        <Empty description={<PageSubtitle>Coming soon!</PageSubtitle>} />
      </Aside>
    </>
  )
}

export default FavouritesContainer
