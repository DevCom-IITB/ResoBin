import { Dialog, DialogTitle, DialogContent, Backdrop } from '@material-ui/core'
import { dateTimestampInSeconds } from '@sentry/utils'
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { QuickReviewContainer } from 'components/QuickReview'
import { ButtonIconDanger } from 'components/shared/Buttons'

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
        if (Vis - cookies.lastVis < 6 * 3600) {
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

  const debugStyles = {
    paragraph: { flexGrow: 1, margin: 0 },
    buttonContainer: { flexShrink: 0 },
  }

  return (
    <StyledDialog
      open={open}
      onClose={handleToClose}
      BackdropComponent={BlurBackdrop}
      fullWidth="md"
      maxWidth="md"
    >
      <StyledTitle>
        <StyledTitleContainer>
          <p style={debugStyles.paragraph}>
            Your feedback will assist us in suggesting appropriate courses for
            you in the future!!
          </p>
          <div style={debugStyles.buttonContainer}>
            <ButtonIconDanger
              tooltip="Close"
              icon={<CloseOutline size="24" />}
              onClick={handleToClose}
              hoverstyle={{ background: 'rgba(0, 0, 0, 0.3)' }}
            />
          </div>
        </StyledTitleContainer>
      </StyledTitle>
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

const StyledTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledTitle = styled(DialogTitle)`
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.textColor};
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 500;
  font-size: 1.25rem;
`

const StyledContent = styled(DialogContent)`
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.textColor};
`
