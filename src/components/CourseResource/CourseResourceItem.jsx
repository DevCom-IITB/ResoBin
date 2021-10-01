import { rgba } from 'polished'
import styled from 'styled-components/macro'

const CourseResourceItem = ({ resource }) => {
  const placeholderImg =
    'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?dpr=2&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop='

  return (
    <GridItem>
      <img src={resource.image || placeholderImg} alt={resource.title} />

      <FigureCaption>
        <a href={resource.file}>
          <h4 style={{ color: 'white' }}>{resource.title}</h4>
        </a>
        <p>{resource.description}</p>
      </FigureCaption>
    </GridItem>
  )
}

export default CourseResourceItem

const GridItem = styled.figure`
  position: relative;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: flex-end;
  grid-row-start: auto;
  grid-column-start: auto;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.textColor};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

  img {
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    opacity: 0.3;
    width: 100%;
    height: 100%;
    background-color: black;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover {
    &::after {
      opacity: 0;
    }
  }
`

const FigureCaption = styled.figcaption`
  position: absolute;
  bottom: 0;
  z-index: 1;
  width: 100%;
  padding: 0.5rem;
  color: ${({ theme }) => theme.textColorInactive};
  background: linear-gradient(
    0deg,
    ${({ theme }) => rgba(theme.darksecondary, 0.95)} 0%,
    ${({ theme }) => rgba(theme.darksecondary, 0.9)} 60%,
    ${({ theme }) => rgba(theme.darksecondary, 0.7)} 100%
  );
`
