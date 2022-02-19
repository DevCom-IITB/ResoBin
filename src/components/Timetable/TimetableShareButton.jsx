import { Share } from '@styled-icons/heroicons-outline'
import { Dropdown, Menu } from 'antd'

import { ButtonIcon } from 'components/shared'
import { useQueryString } from 'hooks'

const TimetableShareButton = ({ coursesInTimetable }) => {
  const { setQueryString } = useQueryString()

  const handleShare = () => {
    setQueryString(
      'id',
      coursesInTimetable.map(({ id }) => id)
    )
  }

  const getURL = () => {
    const urlString = window.location.href
    const splitPair = urlString.split('timetable')
    return `${splitPair[0]}timetable/share${splitPair[1]}`
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
    <Dropdown overlay={menu} trigger={['click']}>
      <ButtonIcon
        icon={<Share size="22" />}
        onClick={handleShare}
        tooltip="Share Timetable as Link"
        hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
      />
    </Dropdown>
  )
}

export default TimetableShareButton
