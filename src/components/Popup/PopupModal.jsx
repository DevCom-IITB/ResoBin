import { Dialog, DialogContent } from '@material-ui/core'
import { dateTimestampInSeconds } from '@sentry/utils'
import { Instagram, Facebook, Linkedin } from '@styled-icons/fa-brands'
import { Globe } from '@styled-icons/heroicons-outline'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import styled from 'styled-components/macro'

import { ButtonSquare } from 'components/shared'

import testPopup from './testPopup.png'

const PopupModal = () => {
  const [open, setOpen] = useState(true)
  const [cookies, setCookies] = useCookies([])
  const [Vis] = useState(dateTimestampInSeconds)

  useEffect(() => {
    if (cookies?.lastVis) {
      if (Vis - cookies.lastVis < 4 * 3600) {
        setOpen(false)
      } else {
        setCookies('lastVis', Vis, { path: '/' })
      }
    } else {
      setCookies('lastVis', Vis, { path: '/' })
    }
  }, [])

  const handleToClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleToClose}
      PaperProps={{
        style: {
          backgroundColor: '#0d090b',
        },
      }}
    >
      <DialogContent>
        <div
          style={{
            padding: '4px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <ButtonSquare
            type="primary"
            htmlType="submit"
            onClick={handleToClose}
          >
            Close
          </ButtonSquare>
        </div>

        <img
          style={{ width: '100%', height: 'auto', margin: 'auto' }}
          src={testPopup}
          alt=""
        />
        <Icons>
          <a
            style={{ padding: '4px 6px' }}
            href="https://www.instagram.com/devcom.iitb/"
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size="28" />
          </a>
          <a
            style={{ padding: '4px 6px' }}
            href="https://www.facebook.com/devcom.iitbombay"
            target="_blank"
            rel="noreferrer"
          >
            <Facebook size="28" />
          </a>
          <a
            style={{ padding: '4px 6px' }}
            href="https://www.linkedin.com/company/devcom-iit-bombay/"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size="28" />
          </a>
          <a
            style={{ padding: '4px 6px' }}
            href="https://devcom-iitb.org/"
            target="_blank"
            rel="noreferrer"
          >
            <Globe size="28" />
          </a>
        </Icons>
      </DialogContent>
    </Dialog>
  )
}

export default PopupModal

const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
