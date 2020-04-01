import React from 'react'
import '../../styles/App.css'
import TemporaryDrawer from './MenuDrawer.js'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew'
import HeaderPanel from '../navigation/HeaderPanel.js'
import PhotoBodyMenu from './PhotoBodyMenu.js'
import Footer from './Footer.js'

//If wrapp it into that component css do not work. Do I need it? 
// import TableFooter from '@material-ui/core/TableFooter'


class HomeView extends React.Component {
  render () {
    return (
      <div className='App'>
        <header>
          <HeaderPanel />
        </header>
        <body className='App-Body'>
          <PhotoBodyMenu />
        </body>
        <footer style={{ backgroundColor: 'black' }}>
          <Footer />
        </footer>
      </div>
    )
  }
}

export default HomeView
