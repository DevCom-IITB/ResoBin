import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useEffect, useState } from 'react'

import {
  Aside,
  PageHeading,
  PageTitle,
  toast,
  LoaderAnimation,
} from 'components/shared'
import { API } from 'config/api'
import { useQueryString } from 'hooks'

import CurrentTime from './CurrentTime'
import TimetableCourseItem from './TimetableCourseItem'
import TimetableLayout from './TimetableLayout'

const TimetableContainerCustom = () => {
  const { getQueryString } = useQueryString()
  const [courseTimetableList, setCourseTimetableList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTimetableData = async (idList) => {
      try {
        setLoading(true)
        const params = {
          ids: encodeURIComponent(idList),
        }

        const response = await API.timetable.list({ params })

        setCourseTimetableList(response.results)
      } catch (error) {
        toast({ status: 'error', content: error })
      } finally {
        setLoading(false)
      }
    }
    const idList = getQueryString('id')
    fetchTimetableData(idList)
  }, [getQueryString])

  return (
    <>
      <PageHeading>
        <PageTitle>Timetable (Shared)</PageTitle>
      </PageHeading>

      {loading && <LoaderAnimation />}

      <Spin
        spinning={loading}
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      >
        <TimetableLayout>
          {courseTimetableList.map((item) => (
            <TimetableCourseItem key={item.id} data={item} />
          ))}

          <CurrentTime mode="vertical" />
        </TimetableLayout>
      </Spin>

      <Aside />
    </>
  )
}

export default TimetableContainerCustom
