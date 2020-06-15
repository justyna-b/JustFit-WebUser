import React from 'react'
import AuthService from '../logging/AuthService'
import { Redirect } from 'react-router-dom'
import HeaderPanel from '../navigation/HeaderPanel.js'
import Footer from '../home/Footer.js'
import NoCarnetView from './UserNoCarnetView.js'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline'
import offerkopia from '../../photos/offerkopia.jpg'

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
      myOffer: []
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
    }
    console.log(this.state.myOffer)
    console.log(this.state.myOffer)
  }

  render () {
    return (
      <div className='App'>
        <div>Lorem ipsum</div>
        {this.state.myOffer.map((activity, index) => (
          <div>
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
                <DoneOutlineIcon /> Okres trwania: {activity.durationInMonths}{' '}
                miesięcy
              </div>
              <div className='text-row'>
                <DoneOutlineIcon /> Cena: {activity.price} złoty za miesięczną
                subskrypcje
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default MyCarnet
