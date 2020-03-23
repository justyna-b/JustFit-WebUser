import React from 'react'
import '../../styles/App.css'
import TemporaryDrawer from './MenuDrawer.js'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew'
import HeaderPanel from '../navigation/HeaderPanel.js'

class HomeView extends React.Component {
  render () {
    return (
      <div className='App'>
        <header>
          <HeaderPanel />
        </header>
        <body className='App-Body'>
          <p>body</p>
        </body>
      </div>
    )
  }
}

export default HomeView
