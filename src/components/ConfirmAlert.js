import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import '../styles/ProgrammeView.css'
import AuthService from './logging/AuthService'



export default function ConfirmAlert (props) {
  const [open, setOpen] = React.useState(false)
  const theme = useTheme()
  const [exercises, setExercises] = React.useState([])

const Auth = new AuthService()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleClickOpen = () => {
    setOpen(true);
      Auth.fetch(
      'https://justfitclient.pythonanywhere.com/api/exercise/'
    ).then(res => {
    setExercises(res)
      console.log(exercises)
    })
    props.onClick();
  }

  const handleClose = () => {
    setOpen(false)
  }

  const confirm = () => {
      Auth.fetch('https://justfitclient.pythonanywhere.com/api/exercise/', {
      method: 'POST',
      body: JSON.stringify({
        id_exercise: props.activityToSignUp,
        user: props.id,
        active: true,
      })
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      }
    })
    .then(handleClose())
    .then(window.location.reload())
  }

  return (
    <div>
      <Button className='sign-up-button'  onClick={handleClickOpen} >
        Zapisz się
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle
          style={{ fontWeight: 'bold', fontSize: '30px' }}
          id='responsive-dialog-title'
        >
          {'Jesteś pewien?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ fontWeight: 'bold', fontSize: '20px' }}>
            Chcesz zapisać się na {props.textA}
          </DialogContentText>
          <DialogContentText style={{ fontWeight: 'bold', fontSize: '20px' }}>
            dnia {props.date} o godzinie {props.hourStart} - {props.hourEnd}
          </DialogContentText>
          <DialogContentText style={{ fontSize: '15px' }}>
            Pamiętaj, żeby w przypadku gdy zrezygnujesz z uczestictwa w
            zajęciach poinformować nas o tym poprzez swój profil lub pod numerem
            telefonu (500 500 500) 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} style={{ color: 'orange' }}>
            Nie, dziękuję
          </Button>
          <Button
            onClick={confirm}
            style={{ color: 'orange', fontSize: '20px' }}
            autoFocus
          >
            Tak, zapisuje się {props.activityToSignUp}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
