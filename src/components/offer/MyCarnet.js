import React from 'react'
import AuthService from '../logging/AuthService'
import { Redirect } from 'react-router-dom'
import HeaderPanel from '../navigation/HeaderPanel.js'
import Footer from '../home/Footer.js'
import NoCarnetView from './UserNoCarnetView.js'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline'

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

    for (const [index, value] of this.state.myCarnetsIds.entries()) {
      await this.Auth.fetch(
        `https://justfit-products.herokuapp.com/products/${this.state.myCarnetsIds[index]}`
      ).then(res => {
        this.state.myOffer.push(res)
      })
    }
    console.log(this.state.myOffer)
    console.log(this.state.myOffer)
  }

  render () {
    const listItems = this.state.myOffer.map(link => (
      <li key={link.id}>{link.id} dsdasdfdf</li>
    ))
    return (
      <div className='App'>
        <div>Lorem ipsum</div>
        {this.state.myOffer.map((carnet, index) => (
          <div>sss</div>
        ))}
        {listItems}

        {this.state.myOffer.map((activity, index) => (
          <div className='main-activity-container'>lorem ipsum</div>
        ))}
      </div>
    )
  }
}

export default MyCarnet
