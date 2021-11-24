import {
  Download,
  InformationCircle,
  PencilAlt,
} from '@styled-icons/heroicons-outline'
import { Popover } from 'antd'
import { rgba } from 'polished'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { API } from 'api'
import placeholderImg from 'assets/images/ResourcePlaceholder.jpg'
import { ButtonIcon, Timestamp } from 'components/shared'
import { UserAvatar } from 'components/shared/Avatar'
import { toastError } from 'components/toast'
import { selectUserProfile } from 'store/userSlice'
import { limitLines } from 'styles/mixins'

import CourseResourceItemEditModal from './CourseResourceItemEditModal'

const CourseResourceItem = ({ content: initialContent }) => {
  const { id } = useSelector(selectUserProfile)
  const isOwner = id === initialContent.userProfile.id

  const [editModalVisible, setEditModalVisible] = useState(false)
  const [content, setContent] = useState(initialContent)

  const handleDownload = () => {
    window.location.href = content.file
  }

  const handleEdit = async (payload) => {
    try {
      await API.resources.update({ id: content.id, payload })
      setContent({ ...content, ...payload })
      setEditModalVisible(false)
    } catch (error) {
      toastError(error)
    }
  }

  return (
    <>
      <GridItem>
        <img src={content.image || placeholderImg} alt={content.title} />

        <ItemInfo>
          <ResourceTitle>{content.title}</ResourceTitle>
          <ResourceDescription>
            {content.description || 'Description not available'}
          </ResourceDescription>

          <Row>
            <ButtonIcon
              color="white"
              size="default"
              icon={<Download size="20" />}
              onClick={handleDownload}
              hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
            />

            {isOwner && (
              <ButtonIcon
                color="white"
                size="default"
                icon={<PencilAlt size="20" />}
                onClick={() => setEditModalVisible(true)}
                hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
              />
            )}

            <Popover
              content={
                <>
                  {content?.userProfile.name}
                  <UserAvatar
                    size="2rem"
                    src={content?.userProfile.profilePicture}
                    alt="Profile picture"
                  />
                  <Timestamp time={content?.timestamp} />
                </>
              }
              title="Uploaded by"
              trigger="click"
            >
              <ButtonIcon
                color="white"
                size="default"
                icon={<InformationCircle size="20" />}
                hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
              />
            </Popover>
          </Row>
        </ItemInfo>
      </GridItem>

      <CourseResourceItemEditModal
        visible={editModalVisible}
        onEdit={handleEdit}
        onCancel={() => setEditModalVisible(false)}
        initialValues={content}
      />
    </>
  )
}

export const CourseResourceGrid = ({ items }) => {
  return (
    <Grid>
      {items.map((content) => (
        <CourseResourceItem key={content.id} content={content} />
      ))}
    </Grid>
  )
}

export default CourseResourceItem

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
  grid-auto-rows: 12rem;
  grid-auto-flow: row dense;
  grid-gap: 1rem;
  padding: 0 0.25rem;
`

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
`

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
`

const ResourceTitle = styled.h5`
  ${limitLines({ count: 2, height: '1.75rem' })}

  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.textColor};
`

const ResourceDescription = styled.p`
  ${limitLines({ count: 2, height: '1.75rem' })}

  margin-bottom: 0;
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
