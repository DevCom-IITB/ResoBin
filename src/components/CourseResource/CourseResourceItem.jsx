import { rgba } from 'polished'
import styled from 'styled-components/macro'

const CourseResourceItem = ({ resource }) => {
  const placeholderImg =
    'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?dpr=2&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop='

  return (
    <GridItem>
      {/* <img src={resource.image || placeholderImg} alt={resource.title} /> */}
      <GridItemTitle>
        <a href={resource.file}>
          <h4 style={{ color: 'white' }}>{resource.title}</h4>
        </a>
        <p>{resource.description}</p>
      </GridItemTitle>
    </GridItem>
  )
}

export default CourseResourceItem

const GridItem = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: flex-end;
  grid-row-start: auto;
  grid-column-start: auto;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.textColor};
  background: url('https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?dpr=2&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=');
  background-size: cover;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &::after {
    content: '';
    position: absolute;
    opacity: 0.3;
    width: 100%;
    height: 100%;
    background-color: black;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover::after {
    opacity: 0;
  }
`

const GridItemTitle = styled.div`
  z-index: 1;
  padding: 0.5rem;
  color: ${({ theme }) => theme.textColorInactive};
  background: ${({ theme }) => rgba(theme.darksecondary, 0.9)};
`
