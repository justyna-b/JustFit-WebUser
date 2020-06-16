import React from 'react'
import styled from 'styled-components'
import CopyrightIcon from '@material-ui/icons/Copyright'
import HomeIcon from '@material-ui/icons/Home'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import FacebookIcon from '@material-ui/icons/Facebook'
import { Link } from 'react-router-dom'

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

  @media only screen and (min-width: 768px) {
    ${({ sm }) => sm && getWidthString(sm)};
    float: left;
  }

  @media only screen and (min-width: 992px) {
    ${({ md }) => md && getWidthString(md)};
    float: left;
  }

  @media only screen and (min-width: 1200px) {
    ${({ lg }) => lg && getWidthString(lg)};
    float: left;
    width: 30%;
    display: inline;
  }
`

export default function Footer (props) {
  return (
    <div>
      <Row>
        <Column xs='4' md='4' lg='4'>
          <div style={{ marginTop: '20px', marginLeft: '20px' }}>
            <div
              style={{
                color: 'orange',
                fontWeight: 'bold',
                fontSize: '40px',
                marginBottom: '20px'
              }}
            >
              JUST FIT <CopyrightIcon />
            </div>
            <div style={{ color: 'orange', marginBottom: '10px' }}>
              Zapraszamy do salonu:{' '}
            </div>
            <div style={{ color: 'orange', marginBottom: '20px' }}>
              <HomeIcon /> Ul. Kcyńska 31 Gdynia
            </div>
            <div style={{ color: 'orange', marginBottom: '10px' }}>
              Godziny otwarcia:{' '}
            </div>
            <div style={{ color: 'orange', marginBottom: '10px' }}>
              pn. - pt. 6.30 - 24.00
            </div>
            <div style={{ color: 'orange', marginBottom: '10px' }}>
              sob. - nd. 6.30 - 22.00{' '}
            </div>
          </div>
        </Column>
        <Column xs='4' md='4' lg='4'>
          <div style={{ marginTop: '100px' }}>
            <div style={{ color: 'orange', marginBottom: '10px' }}>
              Kontakt:{' '}
            </div>
            <div style={{ color: 'orange', marginBottom: '10px' }}>
              <EmailIcon /> justfit@gmail.com
            </div>
            <div style={{ color: 'orange', marginBottom: '10px' }}>
              <PhoneIcon /> 500 500 500
            </div>
            <div style={{ color: 'orange' }}>
              <PhoneIcon /> 500 500 600
            </div>
          </div>
        </Column>
        <Column xs='4' md='4' lg='4'>
          <div style={{ marginTop: '100px' }}>
            <div style={{ color: 'orange' }}> Znajdź nas: </div>
            <a href='https://www.facebook.com/'>
              <div style={{ color: 'orange', fontSize: '40px' }}>
                {' '}
                <FacebookIcon />{' '}
              </div>
            </a>
            <div style={{ color: 'orange', marginBottom: '10px' }}>
              {' '}
              Regulamin{' '}
            </div>
            <a href='https://just-fit.herokuapp.com/#/strona-g%C5%82owna'>
              <div style={{ color: 'orange', marginBottom: '10px' }}>
                {' '}
                STRONA GŁÓWNA
              </div>
            </a>
          </div>
        </Column>
      </Row>
    </div>
  )
}
