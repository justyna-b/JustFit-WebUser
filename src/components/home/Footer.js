import React from 'react'
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
          <div style={{ color: 'orange' }}> Lorem ipsum</div>
        </Column>
        <Column xs='4' md='4' lg='4'>
          <div style={{ color: 'orange' }}> Lorem ipsum</div>
        </Column>
        <Column xs='4' md='4' lg='4'>
          <div style={{ color: 'orange' }}> Lorem ipsum</div>
        </Column>
      </Row>
    </div>
  )
}
