import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import { API } from 'api'
import { LoaderAnimation } from 'components/shared'
import Divider from 'components/shared/Divider'
import { toastError } from 'components/toast'

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

  return (
    <Container>
      <Title>Made with ❤️ by</Title>
      <Divider style={{ margin: '0 1rem', width: 'auto' }} />
      <List>
        {loading && (
          <>
            <LoaderAnimation />
            <ContributorSkeleton />
          </>
        )}

        {contributors.map((item) => (
          <ContributorItem key={item.name} {...item} />
        ))}
      </List>
    </Container>
  )
}

export default ContributorList

const Container = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.headerHeight};
  right: 0;
  z-index: 7;
  width: ${({ theme }) => theme.asideWidthRight};
  height: calc(100vh - 3rem);
  background: ${({ theme }) => theme.secondary};
  box-shadow: inset 2px 0 5px rgba(0, 0, 0, 0.3);
`

const Title = styled.h4`
  padding: 1rem 1rem 0.5rem;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.textColor};
`

const List = styled.ul`
  overflow: auto;
  list-style: none;
  height: calc(100% - ${({ theme }) => theme.headerHeight});
  padding: 0 0.75rem 5rem 1rem;
`
