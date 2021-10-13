import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import { API } from 'api'
import { Aside, LoaderAnimation } from 'components/shared'
import Divider from 'components/shared/Divider'
import { toastError } from 'components/toast'
import { useViewportContext } from 'context/ViewportContext'
import { breakpoints } from 'styles/responsive'

import { ContributorItem, ContributorSkeleton } from './ContributorItem'

const ContributorList = () => {
  const [contributors, setContributors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getContributorsData = async () =>
      API.GitHub.getContributors()
        .then((data) =>
          data.map((item) => ({
            name: item.login,
            avatar: item.avatar_url,
            url: item.html_url,
            contributions: item.contributions,
          }))
        )
        .then((data) => setContributors(data))
        .then(() => setLoading(false))
        .catch((err) => {
          toastError(err.message)
          setLoading(false)
        })

    setLoading(true)
    getContributorsData()
  }, [])
  const { width } = useViewportContext()

  return (
    <Aside
      title="Made with ❤️ by"
      visible={width >= breakpoints.lg}
      loading={loading}
      loadingComponent={<ContributorSkeleton />}
    >
      {contributors.map((item) => (
        <ContributorItem key={item.name} {...item} />
      ))}
    </Aside>
  )
}

export default ContributorList
