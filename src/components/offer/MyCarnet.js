import React from 'react'
import AuthService from '../logging/AuthService'
import { Redirect } from 'react-router-dom'
import HeaderPanel from '../navigation/HeaderPanel.js'
import Footer from '../home/Footer.js'
import NoCarnetView from './UserNoCarnetView.js'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline'
import offerkopia from '../../photos/offerkopia.jpg'
import LoadingScreen from 'react-loading-screen'

class MyCarnet extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      auth: true,
      name: '',
      surname: '',
      email: '',
      id: '',
      usersOfferId: '',
      myCarnetsIds: [],
      myOffer: [],
      loading: true
    }
    this.Auth = new AuthService()
  }

  async componentDidMount () {
    await this.Auth.fetch(
      'https://justfitclient.pythonanywhere.com/api/product/'
    ).then(res => {
      this.setState({
        usersOfferId: res
      })
    })
    console.log(this.state.usersOfferId)

    await this.Auth.fetch(
      'https://justfitclient.pythonanywhere.com/api/product/'
    ).then(res => {
      var temp = []
      res.map(exercise => temp.push(exercise.id_product))
      this.setState({
        myCarnetsIds: temp
      })

      console.log(this.state.myCarnetsIds)
    })

    let myCarnets = []

    for (const [index, value] of this.state.myCarnetsIds.entries()) {
      await this.Auth.fetch(
        `https://justfit-products.herokuapp.com/products/${this.state.myCarnetsIds[index]}`
      )
        .then(res => {
          myCarnets.push(res)
        })
        .then(temp => {
          this.setState({
            myOffer: myCarnets
          })
        })
        .then(this.setState({ loading: false }))
        .catch(error => {
          console.log({ message: 'ERROR ' + error })
        })
    }
    console.log(this.state.myOffer)
    console.log(this.state.myOffer)
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
          {this.state.myOffer.map((activity, index) => (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <div style={{ width: '70%', paddingTop: '30px' }}>
                <img
                  src={offerkopia}
                  alt='Gym-room'
                  className='choosen-offer-img'
                />
                <div className='text-main-container'>
                  <h3>
                    <div className='title-container'> {activity.name} </div>
                  </h3>
                </div>
                <div className='text-row-container'>
                  <div className='text-row'>
                    <DoneOutlineIcon /> Opis: {activity.description}
                  </div>
                  <div className='text-row'>
                    <DoneOutlineIcon /> Okres trwania:{' '}
                    {activity.durationInMonths} miesięcy
                  </div>
                  <div className='text-row'>
                    <DoneOutlineIcon /> Cena: {activity.price} złoty za
                    miesięczną subskrypcje
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </LoadingScreen>
    )
  }
}

export default MyCarnet
