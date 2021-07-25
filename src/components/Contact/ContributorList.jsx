import { useEffect, useState } from 'react'
import styled from 'styled-components'

import getContributors from 'api/github'
import { LoaderAnimation } from 'components/shared'
import Divider from 'components/shared/Divider'
import { toastError } from 'components/toast'

import ContributorItem from './ContributorItem'

const Container = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.headerHeight};
  right: 0;
  z-index: 7;
  width: ${({ theme }) => theme.asideWidthRight};
  height: 100%;
  background: ${({ theme }) => theme.secondary};
  box-shadow: inset 2px 0 5px rgba(0, 0, 0, 0.3);
`

const Title = styled.h4`
  padding: 1rem 1rem 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.textColor};
`

const ContributorList = () => {
  const [contributors, setContributors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const getContributorsData = async () => {
      getContributors()
        .then((data) =>
          data.map((item) => ({
            name: item.login,
            avatar: item.avatar_url,
            url: item.html_url,
          }))
        )
        .then((data) => setContributors(data))
        .then(() => setLoading(false))
        .catch((err) => {
          toastError(err.message)
          setLoading(false)
        })
    }

    getContributorsData()
  }, [])

  return (
    <Container>
      <Title>Made with ❤️ by</Title>
      <Divider style={{ margin: '0 1rem', width: 'auto' }} />
      {loading && <LoaderAnimation />}
      {contributors &&
        contributors.map((item) => (
          <ContributorItem key={item.name} {...item} />
        ))}
    </Container>
  )
}

export default ContributorList
