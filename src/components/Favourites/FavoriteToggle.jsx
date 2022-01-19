import { Bookmark, BookmarkOutline } from '@styled-icons/zondicons'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Badge, ButtonIcon, toast } from 'components/shared'
import { API } from 'config/api'
import { selectFavouriteStatus, updateFavourite } from 'store/userSlice'

const FavoriteToggle = ({ code, initialCount }) => {
  const dispatch = useDispatch()
  const favourite = useSelector(selectFavouriteStatus(code))

  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(initialCount)

  const handleToggle = async () => {
    try {
      setLoading(true)
      if (favourite) {
        await API.courses.favorite.remove({ code })
        setCount(count - 1)
      } else {
        await API.courses.favorite.add({ code })
        setCount(count + 1)
      }

      dispatch(updateFavourite(code))
    } catch (error) {
      toast({ status: 'error', content: error })
    } finally {
      setLoading(false)
    }
  }

  return (
    <ButtonIcon
      tooltip="Add to favorites"
      onClick={handleToggle}
      icon={
        <Badge scale={0.8} count={count} overflowCount={9}>
          {favourite ? <Bookmark size="30" /> : <BookmarkOutline size="30" />}
        </Badge>
      }
      loading={loading}
    />
  )
}

export default FavoriteToggle
