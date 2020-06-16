import React from 'react'
import { Link } from 'react-router-dom'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline'

class CardBody extends React.Component {
  render () {
    return (
      <div
        className='main-container'
        style={{ width: '100%', paddingTop: '20px', height:'100%' }}
      >
        <div>
          <div className='text-main-container'>
            <h3>
              <div className='title-container'> {this.props.title} </div>
            </h3>
          </div>
          <div className='text-row-container' style={{ width: '100%' }}>
            <div className='text-row' style={{ width: '100%' }}>
              <DoneOutlineIcon /> Opis: {this.props.text}
            </div>
            <div className='text-row'>
              <HourglassEmptyIcon /> Okres trwania: {this.props.duration}{' '}
              miesięcy
            </div>
            <div className='text-row'>
              <AttachMoneyIcon /> Cena: {this.props.price} złoty za miesięczną
              subskrypcje
            </div>
          </div>
        </div>

        <div className='buttons-conainer'>
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
      </div>
    )
  }
}
export default CardBody
