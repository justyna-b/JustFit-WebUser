import React from 'react'
import AuthService from '../logging/AuthService'
import { Redirect, Link } from 'react-router-dom'
import HeaderPanel from '../navigation/HeaderPanel.js'
import Footer from '../home/Footer.js'
import CardHeader from './OffersCardHeader.js'
import CardBody from './OffersCardBody.js'
import '../../styles/OffersCard.css'
import LoadingScreen from 'react-loading-screen'
import '../../styles/ChoosenOfferStyle.css'

class ChoosenOffer extends React.Component {
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
            id: res.id,
            offerId: this.props.match.params.offerId
          })
          console.log(this.props.match.params.offerId)
        })
        .catch(error => {
          console.log({ message: 'ERROR ' + error })
        })
    } else {
      this.setState({ auth: false })
    }

    await this.Auth.fetch('https://justfit-products.herokuapp.com/products')
      .then(res => {
        this.setState({
          offers: res
        })
      })
      .then(this.setState({ loading: false }))
  }

  submitOffer = () => {
    this.Auth.fetch('https://justfitclient.pythonanywhere.com/api/product/', {
      method: 'POST',
      body: JSON.stringify({
        special_offer_id: this.props.match.params.offerId
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
        text='Zmieniaj się z nami'
      >
        <div className='App'>
          {this.state.auth ? '' : <Redirect to='/login' />}
          <header>
            <HeaderPanel />
          </header>
          <body className='App-Body'>
            <div
              style={{ width: '60%', height: '100%', backgroundColor: 'pink' }}
            >
              <h3>Podsumowanie:</h3>

              <div className='buttons-conainer'>
                <div className='button-return-wrapper'>
                  <Link to='/3'>
                    <button className='button-return'>anuluj</button>
                  </Link>
                </div>
                <div className='button-purchase-wrapper'>
                  <button
                    className='button-purchase'
                    onClick={() => this.submitOffer()}
                  >
                    ta, kupuje
                  </button>
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

export default ChoosenOffer
