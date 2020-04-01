import React from 'react'
import crossfite from '../../photos/crossfite.jpg'
import gaye from '../../photos/gaye.jpg'
import traininge from '../../photos/traininge.jpg'

import styled from 'styled-components'

const Row = styled.div`
  &::after {
    content: '';
    clear: both;
    display: table;
  }
`

function getWidthString (span) {
  if (!span) return
  let width = (span / 12) * 100
  return `width:${width}%;`
}

const Column = styled.div`
  ${({ xs }) => (xs ? getWidthString(xs) : 'width:100%')};
  width: 100%;
  float: center;
  margin-top: 30px;
  &:hover {
    transform: scale(1.1, 1.1);
  }

  @media only screen and (min-width: 768px) {
    ${({ sm }) => sm && getWidthString(sm)};
    float: left;
    &:hover {
      transform: scale(1.2, 1.2);
    }
  }

  @media only screen and (min-width: 992px) {
    ${({ md }) => md && getWidthString(md)};
    float: left;
    &:hover {
      transform: scale(1.2, 1.2);
    }
  }

  @media only screen and (min-width: 1200px) {
    ${({ lg }) => lg && getWidthString(lg)};
    float: left;
    &:hover {
      transform: scale(1.2, 1.2);
    }
  }
`

export default function PhotoBodyMenu (props) {
  return (
    <div>
      <Row className='Photo-Body'>
        <Column xs='4' md='8' lg='4'>
          <img
            className='img-menu'
            style={{ width: '90%' }}
            src={traininge}
            alt={'logo'}
          />
        </Column>
        <Column xs='4' md='2' lg='4'>
          <img
            className='img-menu'
            style={{ width: '90%' }}
            src={crossfite}
            alt={'logo'}
          />
        </Column>
        <Column xs='4' md='2' lg='4' className='link-logout'>
          <img
            className='img-menu'
            style={{ width: '90%' }}
            src={gaye}
            alt={'logo'}
          />
        </Column>
      </Row>
    </div>
  )
}
