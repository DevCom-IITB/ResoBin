import { Download } from '@styled-icons/heroicons-outline'
import { rgba } from 'polished'
import styled from 'styled-components/macro'

import { ButtonIcon, UserAvatar } from 'components/shared'

const CourseResourceItem = ({ resource }) => {
  const placeholderImg =
    'https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg'

  const handleDownload = () => {
    window.location.href = resource.file
  }

  return (
    <GridItem>
      <img src={resource.image || placeholderImg} alt={resource.title} />

      <FigureCaption>
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            marginBottom: '0.5rem',
          }}
        >
          <UserAvatar size="1.5rem" src={resource.userProfile.profilePicture} />
          <h5 style={{ color: 'white' }}>{resource.userProfile.name}</h5>{' '}
        </div>

        <div>
          <h4 style={{ color: 'white' }}>{resource.title}</h4>
          <p>{resource.description}</p>
        </div>

        <div>
          <ButtonIcon
            color="white"
            size="large"
            icon={<Download size="28" />}
            onClick={handleDownload}
            hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
          />
        </div>
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

  > img {
    min-width: 100%;
    min-height: 100%;
  }

  &::after {
    content: '';
    position: absolute;
    opacity: 0.1;
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
  background: ${({ theme }) => rgba(theme.darksecondary, 0.95)};
`
