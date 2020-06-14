import React from 'react'
import HeaderPanel from '../navigation/HeaderPanel.js'
import AuthService from '../logging/AuthService'
import { Redirect } from 'react-router-dom'
import '../../styles/UsersData.css'
import Footer from '../home/Footer.js'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline'
import PersonIcon from '@material-ui/icons/Person'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import LoadingScreen from 'react-loading-screen'


class UsersData extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      auth: true,
      name: '',
      surname: '',
      phoneNumber: '',
      email: '',
      username: '',
      loading: true
    }
    this.Auth = new AuthService()
  }

  async componentDidMount () {
    if (await this.Auth.loggedIn()) {
      this.Auth.fetch(
        `https://justfitclient.pythonanywhere.com/account/client/properties/`
      )
        .then(response => {
          this.setState({
            name: response.first_name,
            surname: response.last_name,
            phoneNumber: response.phone_number,
            email: response.email,
            username: response.username
          })
        })
        .catch(error => {
          console.log({ message: 'ERROR ' + error })
        })
        .then(this.setState({ loading: false }))
    } else {
      this.setState({ auth: false })
    }
  }

  render () {
    return (
      <LoadingScreen
        loading={this.state.loading}
        bgColor='grey'
        spinnerColor='orange'
        textColor='orange'
        text='Zmieniaj się z nami'
      >
      <div className='App'>
        {this.state.auth ? '' : <Redirect to='/login' />}
        <header>
          <HeaderPanel />
        </header>
        <body className='App-Body'>
          <div className='main-container'>
            <div>
              <div className='text-main-container'>
                <h3>
                  <div className='title-container' style={{marginTop: '15px'}}> Użytkownik </div>
                </h3>
              </div>
              <div className='text-row-container'>
                <div className='text-row'>
                  <PersonIcon /> {this.state.name} {this.state.surname}
                </div>
                <div className='text-row'>
                  <SupervisorAccountIcon /> Nazwa użytkownika:{' '}
                  {this.state.username}
                </div>
                <div className='text-row'>
                  <EmailIcon /> Email: {this.state.email}
                </div>
                <div className='text-row'>
                  <PhoneIcon /> Numer telefonu: {this.state.phoneNumber}
                </div>
              </div>
            </div>
          </div>
        </body>
        <footer style={{ backgroundColor: 'black' }}>
          <Footer />
        </footer>
      </div>
      </LoadingScreen>
    )
  }
}
export default UsersData
