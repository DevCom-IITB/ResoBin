import { Skeleton } from 'antd'

import { LoaderAnimation } from 'components/shared'

const CourseItemLoading = ({ active }) =>
  active && (
    <>
      <LoaderAnimation />
      <Skeleton active />
    </>
  )

export default CourseItemLoading
