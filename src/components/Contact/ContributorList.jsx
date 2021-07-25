import { List, Avatar, Card } from 'antd'
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
  overflow: auto;
  width: ${({ theme }) => theme.asideWidthRight};
  height: 100%;
  background: ${({ theme }) => theme.secondary};
  box-shadow: inset 2px 0 5px rgba(0, 0, 0, 0.3);
`

const Title = styled.h4`
  padding: 1rem 1rem 0.5rem;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.textColor};
`

const ContribList = styled.ul`
  list-style: none;
  height: 100%;

  /* padding: 0; */
  margin: 0 1rem;
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
            contributions: item.contributions,
            description: `${item.contributions} commit${
              item.contributions > 1 ? 's' : ''
            }`,
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
      {/* {contributors &&
        contributors.map((item) => (
          <ContributorItem key={item.name} {...item} />
        ))} */}
      <ContribList>
        {contributors.map((item) => (
          <Card
            key={item.name}
            hoverable
            onClick={() => {
              window.open(item.url, '_blank')
            }}
          >
            <Card.Meta
              avatar={
                <Avatar
                  src={item.avatar}
                  style={{ height: '4rem', width: '4rem' }}
                />
              }
              title={item.name}
              description={item.description}
            />
          </Card>
        ))}
      </ContribList>
    </Container>
  )
}

export default ContributorList
