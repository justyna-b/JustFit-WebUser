import React from 'react'
import { Link } from 'react-router-dom'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty'

class CardBody extends React.Component {
  render () {
    return (
      <div className='card-body'>
        <div className='offers-card-body-title'>
          <h2 style={{ fontWeight: 'bold' }}>{this.props.title}</h2>
        </div>
        <div className='card-body-text-content-container'>
          <p className='body-content'> {this.props.text}</p>
          <p className='date'>
            {' '}
            <HourglassEmptyIcon /> Czas umowy: {this.props.duration} miesięcy
          </p>
          <p className='date'>
            <AttachMoneyIcon /> Cena: 30 zł/miesiąc
          </p>
        </div>
        <Link to={'/offer/selected/' + this.props.value}>
          <button
            className='button button-primary'
            value={this.props.value}
            onClick={this.props.onClick}
            style={{
              backgroundColor: 'orange',
              color: 'black',
              width: '30%',
              paddingTop: '5px',
              paddingBottom: '5px',
              fontWeight: 'bold'
            }}
          >
            <i className='fa fa-chevron-right'></i> KUPUJE
          </button>
        </Link>
      </div>
    )
  }
}
export default CardBody
