import React from 'react'
import './styles/App.css'
import TemporaryDrawer from './components/home/MenuDrawer.js'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'
import HomeView from './components/home/HomeView.js'

function App () {
  return (
    <div className='App'>
      <BrowserRouter>
        <HomeView />
        <Switch>
          <Route path='/:indeks' component={HomeView} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
