import React from 'react'
import AuthService from '../logging/AuthService'
import { Redirect } from 'react-router-dom'
import HeaderPanel from '../navigation/HeaderPanel.js'
import Footer from '../home/Footer.js'
import CardHeader from './OffersCardHeader.js'
import CardBody from './OffersCardBody.js'
import '../../styles/OffersCard.css'
import LoadingScreen from 'react-loading-screen'

class AvailableOffers extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      auth: true,
      name: '',
      surname: '',
      email: '',
      id: '',
      offers: [],
      offerValuePurchaseId: '',
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
      'https://justfit-products.herokuapp.com/products'
    ).then(res => {
      this.setState({
        offers: res
      })
    }).then(this.setState({loading: false}))
  }

  submitHandler = event => {
    this.setState({ offerValuePurchaseId: event.target.value })
    console.log('purchase id' + this.state.offerValuePurchaseId)
    event.preventDefault()
    this.Auth.fetch('https://justfitclient.pythonanywhere.com/api/product/', {
      method: 'POST',
      body: JSON.stringify({
        id_product: this.state.offerValuePurchaseId
      })
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      }
    })
    console.log(this.state.offerValuePurchaseId)
  }

  render () {
    return (
        <LoadingScreen
            loading={this.state.loading}
            bgColor='grey'
            spinnerColor='orange'
            textColor='orange'
            // logoSrc='/logo.png'
            text='Zmieniaj się z nami'
          >
      <div className='App'>
        {this.state.auth ? '' : <Redirect to='/login' />}
        <header>
          <HeaderPanel />
        </header>
        <body className='App-Body'>
        
            {this.state.offers.map(offer => (
              <article className='card' key={offer.id}>
                <CardHeader
                  image={
                    'https://cdn.pixabay.com/photo/2015/06/24/14/41/weights-820144_1280.jpg'
                  }
                />
                <CardBody
                  title={offer.name}
                  text={offer.description}
                  duration={offer.durationInMonths}
                  value={offer.id}
                  onClick={this.submitHandler}
                />
              </article>
            ))}
        </body>
        <footer style={{ backgroundColor: 'black' }}>
          <Footer />
        </footer>
      </div>
                </LoadingScreen>

    )
  }
}

export default AvailableOffers
