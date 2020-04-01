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

//If wrapp it into that component css do not work. Do I need it?
// import TableFooter from '@material-ui/core/TableFooter'

class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      auth: true,
      name: '',
      surname: '',
      phoneNumber: '',
      email: ''
    }

    this.Auth = new AuthService()
  }

  componentDidMount () {
    if (this.Auth.loggedIn()) {
      this.Auth.fetch(
        'http://justfitclient.pythonanywhere.com/account/client/properties/'
      )
        .then(res => {
          this.setState({
            name: res.first_name,
            surname: res.last_name,
            email: res.email,
            phoneNumber: res.phone_number
          })
        })
        .catch(error => {
          console.log({ message: 'ERROR ' + error })
        })
    } else {
      this.setState({ auth: false })
    }
  }

  render () {
    return (
      <div className='App'>
        {this.state.auth ? '' : <Redirect to='/login' />}
        <header>
          <HeaderPanel />
        </header>
        <body className='App-Body'>
          <PhotoBodyMenu />
        </body>
        <footer style={{ backgroundColor: 'black' }}>
          <Footer />
        </footer>
      </div>
    )
  }
}

export default HomeView
