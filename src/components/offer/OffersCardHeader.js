import React from 'react'

class CardHeader extends React.Component {
  render () {
    const { image } = this.props
    var style = {
      backgroundImage: 'url(' + image + ')'
    }
    return (
      <header style={style} id={image} className='card-header'>
        <h4 className='card-header--title'>Nowość</h4>
      </header>
    )
  }
}
export default CardHeader
