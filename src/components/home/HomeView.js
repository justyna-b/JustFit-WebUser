import React from 'react'
import '../../styles/App.css'
import TemporaryDrawer from './MenuDrawer.js'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew'
import HeaderPanel from '../navigation/HeaderPanel.js'
import PhotoBodyMenu from './PhotoBodyMenu.js'
import Footer from './Footer.js'
import AuthService from '../logging/AuthService'
import { Redirect } from 'react-router-dom'
import decode from 'jwt-decode'

class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      auth: true,
      name: '',
      surname: '',
      phoneNumber: '',
      email: '',
      id: ''
    }
    this.Auth = new AuthService()
    this.clickHandler = this.clickHandler.bind(this)
  }

  async componentDidMount () {
    if (this.Auth.loggedIn()) {
      this.Auth.fetch(
        'https://justfitclient.pythonanywhere.com/account/client/properties/'
      )
        .then(res => {
          this.setState({
            name: res.first_name,
            surname: res.last_name,
            email: res.email,
            phoneNumber: res.phone_number,
            id: res.id
          })
        })
        .catch(error => {
          console.log({ message: 'ERROR ' + error })
        })
    } else {
      this.setState({ auth: false })
    }
  }

  clickHandler = event => {
    event.preventDefault()

    let token = localStorage.getItem('token')
    this.Auth.fetch('https://frozen-falls-21272.herokuapp.com/clients/add', {
      method: 'POST',
      body: JSON.stringify({
        active: true,
        token: token,
        id: this.state.id
      })
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      }
    })
  }
  render () {
    return (
      <div className='App'>
        {this.state.auth ? '' : <Redirect to='/login' />}
        <header>
          <HeaderPanel />
        </header>
        <body className='App-Body'>
          <div>
            <button onClick={this.clickHandler}>wydarzenia</button>
            <PhotoBodyMenu />
          </div>
        </body>
        <footer style={{ backgroundColor: 'black' }}>
          <Footer />
        </footer>
      </div>
    )
  }
}

export default HomeView
