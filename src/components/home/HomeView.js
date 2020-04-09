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
import { Link } from 'react-router-dom'
import traininge from '../../photos/traininge.jpg'
import events from '../../photos/events.jpg'
import '../../styles/HomeView.css'

class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      auth: true,
      name: '',
      surname: '',
      phoneNumber: '',
      email: '',
      id: '',
      redirectToEventsPage: false
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
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json()
        }
      })
      .then(data => {
        this.setState({ redirectToEventsPage: true })
        console.log('redirect or not: ' + this.state.redirectToEventsPage)
      })
  }
  render () {
    if (this.state.redirectToEventsPage) {
      window.location.replace('http://www.wp.pl')
      this.setState({ redirectToEventsPage: false })
    }
    return (
      <div className='App'>
        {this.state.auth ? '' : <Redirect to='/login' />}
        <header>
          <HeaderPanel />
        </header>
        <body className='App-Body'>
          <div >
          <div className="redirect-event-container"  style={{width:'30%'}}>
            <button className="button-events-redirect"
              onClick={this.clickHandler}
              style={{ width: '100%', padding: '0px', border: '0px' }}
            >
              <img src={events} style={{ width: '100%' }} />{' '}
              <div style={{ backgroundColor: 'orange' }}>
                <text>WYDARZENIA</text>
              </div>
              <span className="redirect-events" style={{display: 'none'}}>dupa</span>
            </button>
            </div>
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
