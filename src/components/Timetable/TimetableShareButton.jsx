import { Whatsapp } from '@styled-icons/fa-brands'
import { ClipboardCopy, Mail, Share } from '@styled-icons/heroicons-outline'
import { Button, Input } from 'antd'
import { rgba } from 'polished'
import QRCode from 'qrcode.react'
import { useMemo, useState } from 'react'
import styled from 'styled-components/macro'

import { ButtonIcon, Modal } from 'components/shared'
import { copyToClipboard } from 'helpers'

const TimetableShareButton = ({ coursesInTimetable }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const shareUrl = useMemo(() => {
    const ids = coursesInTimetable.map(({ id }) => id)
    const queryString = new URLSearchParams({ ids })
    return `${window.location.origin}/timetable/share?${queryString.toString()}`
  }, [coursesInTimetable])

  const shareWhatsapp = () => {
    const queryString = new URLSearchParams({
      text: `Here's my timetable: ${shareUrl}`,
    })
    window.open(
      `https://api.whatsapp.com/send?${queryString.toString()}`,
      '_blank',
      'noopener noreferrer'
    )
  }

  const shareMail = () => {
    const queryString = new URLSearchParams({
      subject: 'ResoBin timetable',
      body: `My timetable can be found at ${shareUrl}`,
    })
    window.open(`mailto:?${queryString.toString()}`)
  }

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
        title={
          <h2>
            Share Your Timetable <b>(beta)</b>
          </h2>
        }
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            alignItems: 'center',
          }}
        >
          <div>
            <h3>Send this link to a friend to show them your timetable!</h3>
            <Input.Group style={{ display: 'flex', marginTop: '0.75rem' }}>
              <UrlContainer readOnly value={shareUrl} />

              <StyledButton
                onClick={() => copyToClipboard(shareUrl)}
                icon={<ClipboardCopy size="20" />}
              />
            </Input.Group>
          </div>

          <QRCode
            value={shareUrl}
            includeMargin
            level="Q"
            imageSettings={{
              src: '/mstile-144x144.png',
              excavate: true,
              width: 20,
              height: 20,
            }}
            bgColor="#1B1728"
            fgColor="#807da0"
            height={192}
            width={192}
            renderAs="svg"
            style={{ borderRadius: '0.5rem' }}
          />

          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          >
            <h3>Share via:</h3>
            <ButtonIcon
              icon={<Whatsapp size="24" />}
              onClick={shareWhatsapp}
              tooltip="Share via WhatsApp"
            />
            <ButtonIcon
              icon={<Mail size="24" />}
              onClick={shareMail}
              tooltip="Share via Mail"
            />
          </div>
        </div>
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
