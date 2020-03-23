import React from 'react'
import '../../styles/HeaderPanel.css'
import TemporaryDrawer from '../home/MenuDrawer.js'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew'

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
  float: left;
  ${({ xs }) => (xs ? getWidthString(xs) : 'width:100%')};
  color: orange;
  margin-top: 30px;

  @media only screen and (min-width: 768px) {
    ${({ sm }) => sm && getWidthString(sm)};
    color: orange;
    margin-top: 30px;
  }

  @media only screen and (min-width: 992px) {
    ${({ md }) => md && getWidthString(md)};
    color: orange;
    margin-top: 30px;
    cursor: pointer;
  }

  @media only screen and (min-width: 1200px) {
    ${({ lg }) => lg && getWidthString(lg)};
    color: orange;
    margin-top: 30px;
    cursor: pointer;
  }
`

export default function HeaderPanel (props) {
  return (
    <div>
      <Row className='Logo-Panel'>
        <Column xs='4' md='8' lg='8'>
          <p className='logo'>JUST FIT </p>
        </Column>
        <Column xs='4' md='2' lg='2'>
          <button type='button' className='my-contract-button'>
            <AccessibilityNewIcon />
            <span className='span-my-carnet'>Mój karnet </span>
          </button>
        </Column>
        <Column xs='3' md='2' lg='2' className='link-logout'>
          <PowerSettingsNewIcon /> Wyloguj
        </Column>
      </Row>
      <div className='Menu-Panel'>
        <TemporaryDrawer />
      </div>
    </div>
  )
}
