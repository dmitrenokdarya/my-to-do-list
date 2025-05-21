import { SyntheticEvent, useState } from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { selectAppError, setAppErrorAC } from '@/app/app-slice'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/common/hooks'

export const ErrorSnackbar = () => {
    const [open, setOpen] = useState(true)
    const dispatch = useDispatch()
    const error = useAppSelector(selectAppError)

    const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC({ error: null }))
        setOpen(false)
    }
    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                {error}
            </Alert>
        </Snackbar>
    )
}