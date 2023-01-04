import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Aside,
  PageHeading,
  PageTitle,
  toast,
  LoaderAnimation,
  ButtonSquare
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
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTimetableData = async () => {
      try {
        setLoading(true)
        const params = { ids: encodeURIComponent(getQueryString('ids')) }
        const response = await API.timetable.list({ params })
        setCourseTimetableList(response.results)
      } catch (error) {
        toast({ status: 'error', content: error })
      } finally {
        setLoading(false)
      }
    }

    fetchTimetableData()
  }, [getQueryString])

  const addSharedTimetable = async () => {
    try {
      const ids = encodeURIComponent(getQueryString('ids'))
      await API.profile.timetable.addShared({ ids })
      toast({status:"success", content: "Successfully added to timetable"})
      navigate('/timetable',{replace:true})
    } catch (error) {
      toast({status: 'error', content: error})
    }
  }
  return (
    <>
      <PageHeading>
        <PageTitle>Timetable (Shared)</PageTitle>
        <ButtonSquare type='primary' htmlType='submit' onClick={addSharedTimetable}>Add to my timetable</ButtonSquare>
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
