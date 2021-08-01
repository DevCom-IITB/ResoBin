import styled from 'styled-components/macro'

export const TrackHeader = ({ id, title }) => (
  <TrackContainer aria-hidden="true" id={id}>
    {title}
  </TrackContainer>
)

export const RowHeader = ({ id, title }) => (
  <RowContainer id={id}>{title}</RowContainer>
)

const TrackContainer = styled.span`
  display: none;
  grid-row: tracks;
  grid-column: track-${({ id }) => id};
  font-size: 0.75em;
  font-weight: bold;

  @media screen and (min-width: 700px) {
    position: sticky;
    top: 3rem;
    z-index: 1000;
    display: block;
    padding: 10px 5px 5px;
  }
`

const RowContainer = styled.span`
  grid-row: ${({ id }) => id};
  grid-column: times;
  margin: 0;
  font-size: 1rem;
  font-size: 0.75em;
  font-weight: bold;
`
