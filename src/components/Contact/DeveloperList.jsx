import { Avatar } from 'antd'
import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import { Aside, Card, CardSkeleton, toast } from 'components/shared'
import { API } from 'config/api'
import { useResponsive } from 'hooks'

const DeveloperItem = ({ name, avatar, url, contributions }) => {
  return (
    <a key={name} href={url} target="_blank" rel="noreferrer">
      <Card hoverable>
        <Card.Meta
          avatar={<Avatar src={avatar} />}
          title={name}
          description={
            <>
              <b>{contributions}</b> commit
              {contributions > 1 ? 's' : ''}
            </>
          }
        />
      </Card>
    </a>
  )
}

const DeveloperSkeleton = () => (
  <CardSkeleton avatar active paragraph={{ rows: 1 }} />
)

const ContributorList = () => {
  const { isDesktop } = useResponsive()

  const [contributors, setContributors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getContributorsData = async () => {
      try {
        setLoading(true)

        let response = await API.GitHub.getContributors()
        response = response.map((item) => ({
          name: item.login,
          avatar: item.avatar_url,
          url: item.html_url,
          contributions: item.contributions,
        }))

        setContributors(response)
      } catch (error) {
        toast({ status: 'error', content: error })
      } finally {
        setLoading(false)
      }
    }

    getContributorsData()
  }, [])

  return (
    <Aside
      title="Contributors"
      visible={isDesktop}
      loading={loading}
      loadingComponent={<DeveloperSkeleton />}
    >
      <DeveloperList>
        {contributors?.map((item) => (
          <DeveloperItem key={item.name} {...item} />
        ))}
      </DeveloperList>
    </Aside>
  )
}

export default ContributorList

const DeveloperList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`
