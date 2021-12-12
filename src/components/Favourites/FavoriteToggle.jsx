import { Bookmark, BookmarkOutline } from '@styled-icons/zondicons'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ButtonIcon, toast } from 'components/shared'
import { API } from 'config/api'
import { selectFavouriteStatus, updateFavourite } from 'store/userSlice'

const FavoriteToggle = ({ code }) => {
  const dispatch = useDispatch()
  const favourite = useSelector(selectFavouriteStatus(code))
  const [loading, setLoading] = useState(false)

  const handleToggle = async () => {
    try {
      setLoading(true)
      if (favourite) {
        await API.courses.favorite.remove({ code })
      } else {
        await API.courses.favorite.add({ code })
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
      icon={favourite ? <Bookmark size="25" /> : <BookmarkOutline size="25" />}
      color="white"
      loading={loading}
    />
  )
}

export default FavoriteToggle
