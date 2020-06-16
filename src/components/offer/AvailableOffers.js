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
      offerValuePurchaseId: {},
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
        .then(this.setState({ loading: false }))
    } else {
      this.setState({ auth: false })
    }

    await this.Auth.fetch('https://justfit-products.herokuapp.com/products')
      .then(res => {
        this.setState({
          offers: res
        })
      })
  }

  getOffer = offerId => {
    this.setState(
      { offerValuePurchaseId: this.state.offers[offerId].id },
      () => {
        console.log(this.state.offerValuePurchaseId)
      }
    )
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
            {this.state.offers.map((offer, index) => (
              <article className='card' key={offer.id}>
                <CardHeader
                  image={
                    'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
                  }
                />
                <CardBody
                  title={offer.name}
                  text={offer.description}
                  duration={offer.durationInMonths}
                  value={offer.id}
                  price={offer.price}
                  onClick={({ offer }, () => this.getOffer(index))}
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
