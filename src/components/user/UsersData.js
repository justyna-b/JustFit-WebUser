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

class UsersData extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      auth: true,
      name: '',
      surname: '',
      phoneNumber: '',
      email: '',
      username: ''
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
    } else {
      this.setState({ auth: false })
    }
  }

  render () {
    return (
      <div>
        {this.state.auth ? '' : <Redirect to='/' />}
        <header>
          <HeaderPanel />
        </header>
        <body className='user-body'>
          <Card className='root' style={{ width: '40%', height: '60%' }}>
            <CardHeader
              avatar={
                <Avatar aria-label='recipe' className='avatar'>
                  R
                </Avatar>
              }
              subheader={this.state.name + ' ' + this.state.surname}
            />
            <CardContent>
              <Typography variant='body2' color='textSecondary' component='p'>
                <p>Email: {this.state.email} </p>
                <p>Numer telefonu: {this.state.phoneNumber} </p>
                <p>Nazwa użytkownika: {this.state.username}</p>
              </Typography>
            </CardContent>
            <CardActions disableSpacing></CardActions>
          </Card>
        </body>
        <footer style={{ backgroundColor: 'black' }}>
          <Footer />
        </footer>
      </div>
    )
  }
}
export default UsersData
