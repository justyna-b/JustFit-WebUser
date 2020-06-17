import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import '../../styles/MenuDrawerStyles.css'
import { Link } from 'react-router-dom'
import LabelImportantIcon from '@material-ui/icons/LabelImportant'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import PhoneIcon from '@material-ui/icons/Phone'

const useStyles = makeStyles({
  list: {
    width: 250,
    backgroundColor: '#14161A',
    color: 'white'
  },
  fullList: {
    width: 'auto',
    backgroundColor: '#14161A'
  }
})

export default function TemporaryDrawer () {
  const classes = useStyles()
  const [state, setState] = React.useState({
    left: false
  })

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom'
      })}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Rozkład zajęć', 'Mój karnet', 'Oferta', 'Moje dane', 'Wydarzenia'].map(
          (text, index) => (
            <div className='xxx' key={index}>
              <Link to={'/' + index}>
                <ListItem button key={text}>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            </div>
          )
        )}
      </List>
      <div style={{ padding: '20px', justifyContent: 'space-around' }}>
        {' '}
        Masz wątpliwości? Skonsultuj się z naszymi trenerami zadzwoń :{' '}
      </div>
      <div
        style={{
          paddingLeft: '20px',
          paddingRight: '20px',
          fontWeight: 'bold'
        }}
      >
        <PhoneIcon /> 500 500 500
      </div>
      <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        {' '}
        lub napisz do nas pod adresem{' '}
      </div>

      <div
        style={{
          paddingLeft: '20px',
          paddingRight: '20px',
          fontWeight: 'bold'
        }}
      >
        {' '}
        <MailOutlineIcon /> justfit@gmail.com
      </div>

      <Divider />
    </div>
  )

  return (
    <div className='drawer'>
      <div style={{ display: 'inline' }}>
        {['menu'].map(anchor => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>
              <MenuIcon />
              {anchor}
            </Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
      <a
        href='https://just-fit.herokuapp.com/#/strona-g%C5%82owna'
        style={{ color: 'black', textDecoration: 'none' }}
      >
        <div
          style={{
            display: 'inline',
            fontWeight: 'bolder',
            marginLeft: '10px',
            fontSize: '10px',
            color: 'black'
          }}
        >
          <LabelImportantIcon /> STRONA GŁÓWNA{' '}
        </div>
      </a>
    </div>
  )
}
