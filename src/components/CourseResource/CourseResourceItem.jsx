import { Download, PencilAlt } from '@styled-icons/heroicons-outline'
import { rgba } from 'polished'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { ButtonIcon, UserAvatar } from 'components/shared'
import { selectUserProfile } from 'store/userSlice'

const CourseResourceItem = ({ content }) => {
  const { id } = useSelector(selectUserProfile)
  const isOwner = id === content.userProfile.id

  const placeholderImg =
    'https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg'

  const handleDownload = () => {
    window.location.href = content.file
  }

  return (
    <GridItem>
      <img src={content.image || placeholderImg} alt={content.title} />

      <ItemInfo>
        <Row>
          <UserAvatar size="1.5rem" src={content.userProfile.profilePicture} />
          <h5 style={{ color: 'white' }}>{content.userProfile.name}</h5>{' '}
        </Row>

        <h4 style={{ color: 'white' }}>{content.title}</h4>
        <p>{content.description}</p>

        <Row>
          <ButtonIcon
            color="white"
            size="large"
            icon={<Download size="28" />}
            onClick={handleDownload}
            hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
          />
          {isOwner && (
            <ButtonIcon
              color="white"
              size="large"
              icon={<PencilAlt size="26" />}
              onClick={handleDownload}
              hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
            />
          )}
        </Row>
      </ItemInfo>
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

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
`

const ItemInfo = styled.figcaption`
  position: absolute;
  bottom: 0;
  z-index: 1;
  width: 100%;
  padding: 0.5rem;
  color: ${({ theme }) => theme.textColorInactive};
  background: ${({ theme }) => rgba(theme.darksecondary, 0.95)};
`
