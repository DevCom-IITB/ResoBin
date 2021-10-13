import { Avatar, Card, Skeleton } from 'antd'
import { rgba } from 'polished'
import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import { API } from 'api'
import { Aside } from 'components/shared'
import { toastError } from 'components/toast'
import { useViewportContext } from 'context/ViewportContext'
import { breakpoints } from 'styles/responsive'

const DeveloperItem = ({ name, avatar, url, contributions }) => {
  return (
    <a key={name} href={url} target="_blank" rel="noreferrer">
      <StyledCard hoverable>
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
      </StyledCard>
    </a>
  )
}

const DeveloperSkeleton = () => (
  <StyledSkeleton avatar active paragraph={{ rows: 1 }} />
)

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
      loadingComponent={<DeveloperSkeleton />}
    >
      {contributors.map((item) => (
        <DeveloperItem key={item.name} {...item} />
      ))}
    </Aside>
  )
}

export default ContributorList

const StyledCard = styled(Card)`
  .ant-card-body {
    margin: 0.75rem 0;
    border-radius: ${({ theme }) => theme.borderRadius};
    background-color: ${({ theme }) => rgba(theme.darksecondary, 0.3)};
  }

  &.ant-card-hoverable {
    transition: 100ms;

    &:hover {
      border-radius: ${({ theme }) => theme.borderRadius};
      background-color: rgba(0, 0, 0, 0.3);
    }
  }

  &.ant-card-bordered {
    border: 0;
    background-color: transparent;
  }

  .ant-card-meta {
    display: flex;
    align-items: center;

    .ant-card-meta-title {
      font-size: 1rem;
      color: ${({ theme }) => theme.textColor};
    }

    &-description {
      font-size: 0.875rem;
      font-weight: 500;
      color: ${({ theme }) => theme.placeholder};

      b {
        font-weight: 600;
        color: ${({ theme }) => theme.logo};
      }
    }
  }

  .ant-avatar {
    width: 3rem;
    height: 3rem;
  }
`

const StyledSkeleton = styled(Skeleton)`
  display: flex;
  align-items: center;
  padding: 0.875rem 1.125rem;
  margin: 0.75rem 0;
  border-radius: 0.5rem;
  background: #1b172866;
  box-shadow: 0 0 0.5rem rgb(0 0 0 / 20%);

  .ant-skeleton-avatar {
    width: 3rem;
    height: 3rem;
  }

  .ant-skeleton-content .ant-skeleton-title {
    margin: 0;
  }
`
