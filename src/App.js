import React from 'react'
import './styles/App.css'
import TemporaryDrawer from './components/home/MenuDrawer.js'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'
import HomeView from './components/home/HomeView.js'
import ProgrammeView from './components/programme/ProgrammeView.js'
import SignedInUsersOfferView from './components/offer/SignedInUsersOfferView.js'
import StaffsView from './components/staff/StaffsView.js'
import AvailableOffers from './components/offer/AvailableOffers.js'
import LoginPageView from './components/logging/LoginPageView.js'
import UsersData from './components/user/UsersData.js'

function App () {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LoginPageView} />
          <Route exact path='/home' component={HomeView} />
          <Route path='/0' component={ProgrammeView} />
          <Route path='/1' component={SignedInUsersOfferView} />
          <Route path='/2' component={StaffsView} />
          <Route path='/login' component={LoginPageView} />
          <Route path='/user' component={UsersData} />

        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
