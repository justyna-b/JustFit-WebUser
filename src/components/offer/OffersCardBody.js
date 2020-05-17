import React from 'react'
import { Link } from 'react-router-dom'

class CardBody extends React.Component {
  render () {
    return (
      <div className='card-body'>
        <h2>{this.props.title}</h2>
        <p className='body-content'>{this.props.text}</p>
        <p className='date'>Czas umowy: {this.props.duration} miesięcy</p>
        <p className='date'>Cena: 30 zł/miesiąc</p>
        <Link to={'/offer/selected/' + this.props.value}>
          <button
            className='button button-primary'
            value={this.props.value}
            onClick={this.props.onClick}
          >
            <i className='fa fa-chevron-right'></i> WYBIERZ {this.props.value}
          </button>
        </Link>
      </div>
    )
  }
}
export default CardBody
