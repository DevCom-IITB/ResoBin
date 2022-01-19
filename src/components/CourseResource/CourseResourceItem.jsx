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

import placeholderImg from 'assets/images/ResourcePlaceholder.jpg'
import { ButtonIcon, Timestamp, toast, UserAvatar } from 'components/shared'
import { API } from 'config/api'
import { selectUserProfile } from 'store/userSlice'
import { limitLines } from 'styles/mixins'

import CourseResourceItemEditModal from './CourseResourceItemEditModal'

const CourseResourceItem = ({ content: initialContent }) => {
  const { id } = useSelector(selectUserProfile)
  const isOwner = id === initialContent.uploadedBy.id

  const [editModalVisible, setEditModalVisible] = useState(false)
  const [content, setContent] = useState(initialContent)

  const handleDownload = () => {
    window.open(content.file, '_blank', 'noopener,noreferrer')
  }

  const handleEdit = async (payload) => {
    try {
      await API.resources.update({ id: content.id, payload })
      setContent({ ...content, ...payload })
      setEditModalVisible(false)
    } catch (error) {
      toast({ status: 'error', content: error })
    }
  }

  return (
    <>
      <GridItem>
        <img
          src={content.thumbnail || placeholderImg}
          alt={content.title}
          style={{ width: '100%', height: '100%' }}
        />

        <ItemInfo>
          <ResourceTitle>{content.title}</ResourceTitle>
          <ResourceDescription>
            {content.description || 'Description not available'}
          </ResourceDescription>

          <Row>
            <ButtonIcon
              size="default"
              icon={<Download size="20" />}
              onClick={handleDownload}
              hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
            />

            {isOwner && (
              <ButtonIcon
                size="default"
                icon={<PencilAlt size="20" />}
                onClick={() => setEditModalVisible(true)}
                hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
              />
            )}

            <Popover
              content={
                <PopoverContent>
                  <UserAvatar
                    size="2rem"
                    src={content?.uploadedBy.profilePicture}
                    alt="Profile picture"
                  />

                  <PopoverHeading>
                    <h3>
                      Uploaded by: <b>{content?.uploadedBy.name}</b>
                    </h3>
                    <h3>
                      Author: <b>{content?.author || 'Not available'}</b>
                    </h3>
                    <span>
                      Uploaded <Timestamp time={content?.timestamp} />
                    </span>
                  </PopoverHeading>
                </PopoverContent>
              }
              title="Information"
              trigger="click"
            >
              <ButtonIcon
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
  grid-auto-rows: 12rem;
  grid-auto-flow: row dense;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
  padding: 0 0.25rem;
`

const GridItem = styled.figure`
  position: relative;
  display: flex;
  flex-direction: column;
  grid-row-start: auto;
  grid-column-start: auto;
  justify-content: flex-end;
  overflow: hidden;
  color: ${({ theme }) => theme.textColor};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 0 5px rgb(0 0 0 / 30%);
`

const Row = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
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

const PopoverContent = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`

const PopoverHeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: ${({ theme }) => theme.textColorInactive};

  h3 {
    color: ${({ theme }) => theme.textColor};
    font-size: 0.75rem;
    font-weight: 400;
  }
`
