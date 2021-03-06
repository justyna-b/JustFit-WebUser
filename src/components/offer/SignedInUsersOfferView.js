import React from 'react'
import AuthService from '../logging/AuthService'
import { Redirect } from 'react-router-dom'
import HeaderPanel from '../navigation/HeaderPanel.js'
import Footer from '../home/Footer.js'
import NoCarnetView from './UserNoCarnetView.js'
import MyCarnet from './MyCarnet.js'
import LoadingScreen from 'react-loading-screen'

class SignedInUsersOfferView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      auth: true,
      name: '',
      surname: '',
      email: '',
      id: '',
      usersOfferId: '',
      loading: true
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

    await this.Auth.fetch(
      'https://justfitclient.pythonanywhere.com/api/product/'
    )
      .then(res => {
        this.setState({
          usersOfferId: res
        })
      })
      .then(this.setState({ loading: false }))
      .catch(error => {
        console.log({ message: 'ERROR ' + error })
      })
    console.log(this.state.usersOfferId)
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
            {this.state.usersOfferId.length > Number(0) ? (
              <MyCarnet />
            ) : (
              <NoCarnetView />
            )}
          </body>
          <footer style={{ backgroundColor: 'black' }}>
            <Footer />
          </footer>
        </div>
      </LoadingScreen>
    )
  }
}

export default SignedInUsersOfferView
