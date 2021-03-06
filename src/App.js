import React from 'react'
import './styles/App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import HomeView from './components/home/HomeView.js'
import ProgrammeView from './components/programme/ProgrammeView.js'
import SignedInUsersOfferView from './components/offer/SignedInUsersOfferView.js'
import StaffsView from './components/staff/StaffsView.js'
import AvailableOffers from './components/offer/AvailableOffers.js'
import LoginPageView from './components/logging/LoginPageView.js'
import UsersData from './components/user/UsersData.js'
import ChoosenOffer from './components/offer/ChoosenOffer.js'

function App () {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LoginPageView} />
          <Route exact path='/home' component={HomeView} />
          <Route exact path='/4' component={HomeView} />
          <Route path='/0' component={ProgrammeView} />
          <Route path='/1' component={SignedInUsersOfferView} />
          <Route path='/login' component={LoginPageView} />
          <Route path='/3' component={UsersData} />
          <Route path='/2' component={AvailableOffers} />
          <Route path='/offer/selected/:offerId' component={ChoosenOffer}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
