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
import DoneOutlineIcon from '@material-ui/icons/DoneOutline'
import offerkopia from '../../photos/offerkopia.jpg'

class ChoosenOffer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      auth: true,
      name: '',
      surname: '',
      email: '',
      id: '',
      offer: {},
      loading: true,
      bought: false
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
        })
        .catch(error => {
          console.log({ message: 'ERROR ' + error })
        })
    } else {
      this.setState({ auth: false })
    }

    await this.Auth.fetch(
      `https://justfit-products.herokuapp.com/products/${this.props.match.params.offerId}`
    )
      .then(res => {
        this.setState({
          offer: res
        })
      })
      .then(this.setState({ loading: false }))
  }

  submitOffer = () => {
    this.Auth.fetch('https://justfitclient.pythonanywhere.com/api/product/', {
      method: 'POST',
      body: JSON.stringify({
        id_product: this.props.match.params.offerId,
        active: true
      })
    }).then(response => {
      this.setState({ bought: true })
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      }
    })
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
              {this.state.bought ? (
                <div className='bought-container'>
                  <div className='bought-carnet'>Kupione</div>
                  <Link to="/2"><button className='bought-button'>powrót</button></Link>
                </div>
              ) : (
                <div>
                  <div>
                    <img
                      src={offerkopia}
                      alt='Gym-room'
                      className='choosen-offer-img'
                    />
                    <div className='text-main-container'>
                      <h3>
                        <div className='title-container'>
                          {' '}
                          {this.state.offer.name}{' '}
                        </div>
                      </h3>
                    </div>
                    <div className='text-row-container'>
                      <div className='text-row'>
                        <DoneOutlineIcon /> Użytkownik: {this.state.name}{' '}
                        {this.state.surname}
                      </div>
                      <div className='text-row'>
                        <DoneOutlineIcon /> Opis: {this.state.offer.description}
                      </div>
                      <div className='text-row'>
                        <DoneOutlineIcon /> Okres trwania:{' '}
                        {this.state.offer.durationInMonths} miesięcy
                      </div>
                      <div className='text-row'>
                        <DoneOutlineIcon /> Cena: {this.state.offer.price} złoty
                        za miesięczną subskrypcje
                      </div>
                    </div>
                  </div>

                  <div className='buttons-conainer'>
                    <div className='button-return-wrapper'>
                      <Link to='/2'>
                        <button className='button-return'>ANULUJ</button>
                      </Link>
                    </div>
                    <div className='button-purchase-wrapper'>
                      <button
                        className='button-purchase'
                        onClick={() => this.submitOffer()}
                      >
                        KUPUJE
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
