import { Dialog, DialogTitle, DialogContent, Backdrop } from '@material-ui/core'
import { dateTimestampInSeconds } from '@sentry/utils'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { QuickReviewContainer } from 'components/QuickReview'

const PopupModal = () => {
  const [open, setOpen] = useState(true)
  const [cookies, setCookies] = useCookies([])
  const [Vis] = useState(dateTimestampInSeconds)

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const BlurBackdrop = styled(Backdrop)`
    backdrop-filter: blur(10px);
  `

  useEffect(() => {
    // Show popup only if the user is authenticated
    if (isAuthenticated) {
      if (cookies?.lastVis) {
        if (Vis - cookies.lastVis < 4 * 3600) {
          setOpen(false)
        } else {
          setCookies('lastVis', Vis, { path: '/' })
          setOpen(true)
        }
      } else {
        setCookies('lastVis', Vis, { path: '/' })
        setOpen(true)
      }
    } else {
      setOpen(false)
    }
  }, [isAuthenticated, cookies, setCookies, Vis])

  const handleToClose = () => {
    setOpen(false)
  }

  return (
    <StyledDialog
      open={open}
      onClose={handleToClose}
      BackdropComponent={BlurBackdrop}
      fullWidth="md"
      maxWidth="md"
    >
      <StyledTitle>Quick Review 🔥</StyledTitle>
      <StyledContent>
        <QuickReviewContainer />
      </StyledContent>
    </StyledDialog>
  )
}

export default PopupModal

const StyledDialog = styled(Dialog)`
  && .MuiDialog-container {
    && .MuiPaper-root {
      background-color: black;
    }

    && .MuiBackdrop-root {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
`

const StyledTitle = styled(DialogTitle)`
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.textColor};
  font-weight: 500;
  font-size: 1.25rem;
`

const StyledContent = styled(DialogContent)`
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.textColor};
`
