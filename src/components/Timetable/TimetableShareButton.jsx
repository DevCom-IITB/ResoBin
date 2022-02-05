import { Share } from '@styled-icons/heroicons-outline'
import { Dropdown, Menu } from 'antd'
import styled from 'styled-components/macro'

import { ButtonIcon } from 'components/shared'
import { useQueryString } from 'hooks'

const TimetableShareButton = ({ coursesInTimetable }) => {
  const { setQueryString } = useQueryString()

  const coursesJSON = JSON.stringify(coursesInTimetable)
  const handleShare = () => {
    setQueryString('id', coursesJSON)
  }

  const getURL = () => {
    const urlString = window.location.href
    const splitPair = urlString.split('timetable')
    return `${splitPair[0]}timetable/custom${splitPair[1]}`
  }

  const menu = (
    <Menu theme="dark">
      <Menu.Item key="share_link">
        <a href={getURL()} target="_blank" rel="noreferrer">
          Shareable Link <b>(beta)</b>: &nbsp;
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <ShareButtonContainer>
      <Dropdown overlay={menu} trigger={['click']}>
        <ButtonIcon
          icon={<Share size="22" />}
          onClick={handleShare}
          tooltip="Share Timetable as Link"
          hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
        />
      </Dropdown>
    </ShareButtonContainer>
  )
}

export default TimetableShareButton

const ShareButtonContainer = styled.div`
  position: absolute;
  left: 0;
`
