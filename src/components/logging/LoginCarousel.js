import Carousel from 'react-bootstrap/Carousel'
import React, { useState } from 'react'
import first from '../../photos/first.jpg'
import second from '../../photos/second.jpg'
import third from '../../photos/third.jpg'

function LoginCarousel () {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      style={{ height: '70%', paddingTop: '15%' }}
    >
      <Carousel.Item style={{ height: '100%' }}>
        <img className='d-block w-100' src={first} alt='First slide' />
        <Carousel.Caption>
          <h3>Profesjonalny sprzęt</h3>
          <p>
            Dziesiątki nowego, profesjonalnego sprzętu, znajdź coś dla siebie
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className='d-block w-100' src={second} alt='Second slide' />

        <Carousel.Caption>
          <h3>Wykwalifikowana kadra</h3>
          <p>
            Nasi trenerzy pomogą Ci w osiągnięciu Twojej wymarzonej sylwetki
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className='d-block w-100' src={third} alt='Third slide' />

        <Carousel.Caption>
          <h3>Różnorodne zajęcia</h3>
          <p>
            Wiele zajęć na różnych poziomach - znajdźmy Twoją ulubioną formę
            ruchu
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}
export default LoginCarousel
