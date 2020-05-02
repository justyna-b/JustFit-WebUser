import React from 'react'
import '../../styles/UserNoCarnetView.css'
import { Link } from 'react-router-dom'

class CardHeader extends React.Component {
  render () {
    const { image } = this.props
    var style = {
      backgroundImage: 'url(' + image + ')'
    }
    return (
      <header
        style={style}
        id={image}
        className='card-header-no-carnet'
      ></header>
    )
  }
}

class NoCarnetView extends React.Component {
  render () {
    const { image } = this.props
    var style = {
      backgroundImage: 'url(' + image + ')'
    }
    return (
      <div className='card-no-carnet'>
        <CardHeader
          image={
            'https://cdn.pixabay.com/photo/2016/08/13/00/11/door-1590024_1280.jpg'
          }
        />
        <div className='card-body-no-carnet'>
          <h2 className='card-body-no-carnet-text'>
            Nie masz wykupionego karnetu
          </h2>
          <Link to='/3'>
            <div className='button-buy-carnet-container'>
              {' '}
              <button className='button-buy-carnet'>kup karnet</button>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}
export default NoCarnetView
