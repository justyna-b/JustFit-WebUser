import React from 'react'
import '../../styles/HeaderPanel.css'
import TemporaryDrawer from '../home/MenuDrawer.js'
import AuthService from '../logging/AuthService'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import {Link} from 'react-router-dom'

export default class HeaderPanel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      auth: true,
      name: '',
      surname: '',
      id: '',
      redirectToEventsPage: false,

      anchorEl: null
    }
    this.Auth = new AuthService()
    this.onClickLogOut = this.onClickLogOut.bind(this)

    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  async componentDidMount () {
    if (await this.Auth.loggedIn()) {
      this.Auth.fetch(
        `https://justfitclient.pythonanywhere.com/account/client/properties/`
      )
        .then(response => {
          this.setState({
            name: response.first_name,
            surname: response.last_name
          })
        })
        .catch(error => {
          console.log({ message: 'ERROR ' + error })
        })
    } else {
      this.setState({ auth: false })
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  onClickLogOut = event => {
    event.preventDefault()
    this.Auth.logout()
    window.location.reload()
    console.log('shoul logout true')
  }

  render () {
    return (
      <div>
        <div className='grid-container'>
          <div className='grid-item-b'>
            {' '}
            <p className='logo '>JUST FIT </p>{' '}
          </div>
          <div className=' grid-item-a' style={{ float: 'right' }}>
            <Button
              aria-controls='simple-menu'
              aria-haspopup='true'
              onClick={this.handleClick}
              style={{ color: 'white' }}
            >
             Użytkownik: {this.state.name} {this.state.surname} <ArrowDropDownIcon />
            </Button>
            <Menu
              id='simple-menu'
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
              style={{ marginTop: '20px' }}
            >
              <MenuItem
                style={{ color: 'white', background: '#14161A' }}
                onClick={this.handleClose}
              >
                Moje konto
              </MenuItem>
              <Link to="/user">
              <MenuItem
                style={{ color: 'white', background: '#14161A' }}
                onClick={this.handleClose}
              >
                Moje dane
              </MenuItem>
              </Link>
              <MenuItem
                style={{ color: 'white', background: '#14161A' }}
                onClick={this.onClickLogOut}
              >
                Wyloguj
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div className='Menu-Panel'>
          <TemporaryDrawer />
        </div>
      </div>
    )
  }
}
