import { useEffect, useState } from 'react'
import { FaTrophy, FaMedal } from 'react-icons/fa'
import styled from 'styled-components/macro'

import { LoaderAnimation, toast } from 'components/shared'
import { API } from 'config/api'

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await API.leaderboard.resources()
        setLeaderboardData(data)
      } catch (err) {
        setError('Failed to load leaderboard')
        toast({ status: 'error', content: 'Failed to load leaderboard data' })
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  if (loading) {
    return (
      <Container>
        <Header>
          <Title>Top Contributors</Title>
          <Subtitle>Get your spot on the leaderboard by helping!</Subtitle>
        </Header>
        <LoaderAnimation />
      </Container>
    )
  }

  if (error || !leaderboardData || leaderboardData.length === 0) {
    return (
      <Container>
        <Header>
          <Title>Top Contributors</Title>
          <Subtitle>Get your spot on the leaderboard by helping!</Subtitle>
        </Header>
        <EmptyMessage>No contributors yet. Be the first!</EmptyMessage>
      </Container>
    )
  }

  const top3 = leaderboardData.slice(0, 3)
  const rest = leaderboardData.slice(3)
  const maxContributions = Math.max(
    ...leaderboardData.map((d) => d.contributions)
  )

  // Calculate dynamic heights for podium bars (min 40px, max 100px)
  const calculatePodiumHeight = (contributions) => {
    const ratio = contributions / maxContributions
    const minHeight = 40
    const maxHeight = 100
    return `${minHeight + ratio * (maxHeight - minHeight)}px`
  }

  return (
    <Container>
      <Header>
        <Title>Top Contributors</Title>
        <Subtitle>Get your spot on the leaderboard by helping!</Subtitle>
      </Header>

      {top3.length >= 3 && (
        <PodiumSection>
          {/* 2nd place - left */}
          <PodiumItem position={2}>
            <ContributionCount>{top3[1].contributions}</ContributionCount>
            <MedalIcon>
              <FaMedal color="#C0C0C0" size={28} />
            </MedalIcon>
            <PodiumBar height={calculatePodiumHeight(top3[1].contributions)} />
            <PodiumName>{top3[1].name}</PodiumName>
            <RollBadge>{top3[1].rollNo}</RollBadge>
          </PodiumItem>

          {/* 1st place - center */}
          <PodiumItem position={1}>
            <ContributionCount>{top3[0].contributions}</ContributionCount>
            <TrophyIcon>
              <FaTrophy color="#FFD700" size={32} />
            </TrophyIcon>
            <PodiumBar
              height={calculatePodiumHeight(top3[0].contributions)}
              isFirst
            />
            <PodiumName bold>{top3[0].name}</PodiumName>
            <RollBadge highlight>{top3[0].rollNo}</RollBadge>
          </PodiumItem>

          {/* 3rd place - right */}
          <PodiumItem position={3}>
            <ContributionCount>{top3[2].contributions}</ContributionCount>
            <MedalIcon>
              <FaMedal color="#CD7F32" size={28} />
            </MedalIcon>
            <PodiumBar height={calculatePodiumHeight(top3[2].contributions)} />
            <PodiumName>{top3[2].name}</PodiumName>
            <RollBadge>{top3[2].rollNo}</RollBadge>
          </PodiumItem>
        </PodiumSection>
      )}

      {rest.length > 0 && (
        <TableSection>
          <TableHeader>
            <TableHeaderCell width="15%">S No.</TableHeaderCell>
            <TableHeaderCell width="30%">Name</TableHeaderCell>
            <TableHeaderCell width="25%">Roll No.</TableHeaderCell>
            <TableHeaderCell width="30%">Contributions</TableHeaderCell>
          </TableHeader>
          {rest.map((item) => (
            <TableRow key={item.id}>
              <TableCell width="15%">{item.rank}</TableCell>
              <TableCell width="30%">{item.name}</TableCell>
              <TableCell width="25%">{item.rollNo}</TableCell>
              <TableCell width="30%">
                <ProgressContainer>
                  <ProgressBar
                    width={`${(item.contributions / maxContributions) * 100}%`}
                  />
                  <ProgressText>{item.contributions}</ProgressText>
                </ProgressContainer>
              </TableCell>
            </TableRow>
          ))}
        </TableSection>
      )}
    </Container>
  )
}

export default Leaderboard

const Container = styled.div`
  background: ${({ theme }) => theme.darksecondary};
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1rem;
`

const Header = styled.div`
  margin-bottom: 1rem;
`

const Title = styled.h3`
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
`

const Subtitle = styled.p`
  color: ${({ theme }) => theme.textColorInactive};
  font-size: 0.75rem;
  margin: 0;
`

const EmptyMessage = styled.p`
  color: ${({ theme }) => theme.textColorInactive};
  font-size: 0.875rem;
  text-align: center;
  padding: 2rem 0;
`

const PodiumSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 0 0.5rem;
`

const getOrderForPosition = (position) => {
  if (position === 1) return 2
  if (position === 2) return 1
  return 3
}

const PodiumItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  order: ${({ position }) => getOrderForPosition(position)};
`

const ContributionCount = styled.span`
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`

const TrophyIcon = styled.div`
  margin-bottom: 0.25rem;
`

const MedalIcon = styled.div`
  margin-bottom: 0.25rem;
`

const PodiumBar = styled.div`
  width: 70px;
  height: ${({ height }) => height};
  background: ${({ isFirst }) =>
    isFirst
      ? 'linear-gradient(180deg, #a89dd8 0%, #8b7ec9 100%)'
      : 'linear-gradient(180deg, #9088c4 0%, #7d74b3 100%)'};
  border-radius: 8px 8px 0 0;
`

const PodiumName = styled.span`
  color: ${({ theme }) => theme.textColor};
  font-size: 0.7rem;
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  margin-top: 0.5rem;
  text-align: center;
  max-width: 80px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
`

const RollBadge = styled.span`
  background: ${({ highlight }) => (highlight ? '#f0b90b' : '#3d3654')};
  color: ${({ highlight, theme }) =>
    highlight ? '#1b1728' : theme.textColorInactive};
  font-size: 0.6rem;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  margin-top: 0.25rem;
`

const TableSection = styled.div`
  display: flex;
  flex-direction: column;
`

const TableHeader = styled.div`
  display: flex;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.dividerColor};
`

const TableHeaderCell = styled.span`
  color: ${({ theme }) => theme.textColorInactive};
  font-size: 0.65rem;
  font-weight: 500;
  width: ${({ width }) => width};
`

const TableRow = styled.div`
  display: flex;
  padding: 0.4rem 0;
  align-items: center;
`

const TableCell = styled.span`
  color: ${({ theme }) => theme.textColorInactive};
  font-size: 0.65rem;
  width: ${({ width }) => width};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`

const ProgressBar = styled.div`
  height: 6px;
  width: ${({ width }) => width};
  max-width: 60%;
  background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 3px;
`

const ProgressText = styled.span`
  color: ${({ theme }) => theme.textColorInactive};
  font-size: 0.6rem;
`
