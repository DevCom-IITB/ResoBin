import { ClipboardCopy, Share } from '@styled-icons/heroicons-outline'
import { Button, Input } from 'antd'
import { rgba } from 'polished'
import { useMemo, useState } from 'react'
import styled from 'styled-components/macro'

import { ButtonIcon, Modal } from 'components/shared'
import { copyToClipboard } from 'helpers'

const TimetableShareButton = ({ coursesInTimetable }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const shareURL = useMemo(() => {
    const ids = coursesInTimetable.map(({ id }) => id)
    const queryString = new URLSearchParams({ ids })
    return `${window.location.origin}/timetable/share?${queryString.toString()}`
  }, [coursesInTimetable])

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <ButtonIcon
        icon={<Share size="22" />}
        onClick={showModal}
        tooltip="Share Timetable as Link"
        hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
      />

      <Modal
        title={<h2>Share Your Timetable</h2>}
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <ModalContent>
          <h4>
            Try to send this link to a friend to show them your timetable.
          </h4>

          <Input.Group style={{ display: 'flex' }}>
            <UrlContainer readOnly value={shareURL} />

            <StyledButton
              onClick={() => copyToClipboard(shareURL)}
              icon={<ClipboardCopy size="20" />}
            />
          </Input.Group>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TimetableShareButton

const UrlContainer = styled(Input)`
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.darksecondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.placeholder};
  font-size: 1rem;
  font-weight: 500;
  overflow-x: scroll;
  white-space: nowrap;
  height: 2rem;

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.logo};
    box-shadow: 0 0 1rem ${({ theme }) => rgba(theme.logo, 0.2)};
  }

  &.ant-input {
    width: 100%;
  }
`

const StyledButton = styled(Button)`
  border: 1px solid ${({ theme }) => theme.placeholder};
  border-radius: ${({ theme }) => theme.borderRadius};
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background: ${({ theme }) => theme.darksecondary};
  color: ${({ theme }) => theme.textColor};

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.logo};
    color: ${({ theme }) => theme.darksecondary};
    border-color: ${({ theme }) => theme.logo};
    box-shadow: 0 0 1rem ${({ theme }) => rgba(theme.logo, 0.2)};
  }
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
