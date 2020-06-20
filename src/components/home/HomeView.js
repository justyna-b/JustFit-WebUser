import React from 'react'
import '../../styles/App.css'
import HeaderPanel from '../navigation/HeaderPanel.js'
import PhotoBodyMenu from './PhotoBodyMenu.js'
import Footer from './Footer.js'
import AuthService from '../logging/AuthService'
import { Redirect } from 'react-router-dom'
import '../../styles/HomeView.css'
import gymroom from '../../photos/gymroom.jpg'

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
      window.location.replace('https://justfit-events.herokuapp.com/events/'+this.state.id)
      this.setState({ redirectToEventsPage: false })
    }
    return (
      <div className='App'>
        {this.state.auth ? '' : <Redirect to='/login' />}
        <header>
          <HeaderPanel />
        </header>
        <body className='App-Body'>
          <div style={{ display: 'inline' }}>
            <div style={{ width: '90%', paddingTop: '40px', marginLeft: '5%' }}>
              <div
                className='redirect-event-container '
                style={{ width: '50%' }}
              >
                <button
                  className='container'
                  onClick={this.clickHandler}
                  style={{ width: '100%', padding: '0px', border: '0px' }}
                >
                  <img src={gymroom} alt='Gym-room' style={{ width: '100%' }} />
                  <div className='content'>
                    <h1 style={{ textAlign: 'left' }}>WYDARZENIA</h1>
                    <p style={{ fontSize: '16px', textAlign: 'left' }}>
                      Kliknij tutaj by sprawdzić w jakich wydarzeniach bierzesz
                      udział oraz co dla Ciebie przygotowaliśmy!
                    </p>
                  </div>
                  <div className='content-hover'>
                    <h1>PRZEJDŹ DO MOICH WYDARZEŃ</h1>
                  </div>
                </button>
              </div>
            </div>
            <button
              className='container-mobile'
              onClick={this.clickHandler}
              style={{ width: '100%', padding: '0px', border: '0px' }}
            >
              {' '}
              WYDARZENIA{' '}
            </button>
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
