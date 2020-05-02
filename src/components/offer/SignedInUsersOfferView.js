import React from 'react'
import AuthService from '../logging/AuthService'
import { Redirect } from 'react-router-dom'
import HeaderPanel from '../navigation/HeaderPanel.js'
import Footer from '../home/Footer.js'
import NoCarnetView from './UserNoCarnetView.js'

class SignedInUsersOfferView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      auth: true,
      name: '',
      surname: '',
      email: '',
      id: '',
      usersOfferId: ''
    }
    this.Auth = new AuthService()
  }

  async componentDidMount () {
    if (this.Auth.loggedIn()) {
      await this.Auth.fetch(
        'https://justfitclient.pythonanywhere.com/account/client/properties/'
      )
        .then(res => {
          this.setState({
            name: res.first_name,
            surname: res.last_name,
            email: res.email,
            id: res.id
          })
        })
        .catch(error => {
          console.log({ message: 'ERROR ' + error })
        })
    } else {
      this.setState({ auth: false })
    }

     await this.Auth.fetch('https://justfitclient.pythonanywhere.com/api/product/').then(
      res => {
        this.setState({
          usersOfferId: res
        })
      }
    )
    console.log(this.state.usersOfferId)
  }
  render () {
    return (
      <div className='App'>
        {this.state.auth ? '' : <Redirect to='/login' />}
        <header>
          <HeaderPanel />
        </header>
        <body className='App-Body'>
        {
          (this.state.usersOfferId.length > Number(0)) ? "nie jest pusty" : <NoCarnetView/>
        }
          {/* {this.state.name} {this.state.surname} */}
        </body>
        <footer style={{ backgroundColor: 'black' }}>
          <Footer />
        </footer>
      </div>
    )
  }
}

export default SignedInUsersOfferView
