
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import { dateTimestampInSeconds } from '@sentry/utils'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

import testPopup from './testPopup.png'

const PopupModal = () => {

    const [open, setOpen] = useState(true);
    const [cookies, setCookies] = useCookies([])
    const [Vis, ] = useState(dateTimestampInSeconds)

    useEffect(() => {
        if(cookies?.lastVis){
            if(Vis-cookies.lastVis < 8*3600){
                setOpen(false)
            }
            else{
                setCookies('lastVis', Vis, {path: '/'})
            }
        }
        else{
            setCookies('lastVis', Vis, {path: '/'})
        }
    }, [])
  
    
    const handleToClose = () => {             
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleToClose}>
            <DialogTitle>New Event!</DialogTitle>
            <DialogContent>
                <img src={testPopup} alt='' />
            </DialogContent>
        </Dialog>
    )
}

export default PopupModal