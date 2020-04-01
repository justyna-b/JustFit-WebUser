// import TableFooter from '@material-ui/core/TableFooter'
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
  margin-top: 30px;


  @media only screen and (min-width: 768px) {
    ${({ sm }) => sm && getWidthString(sm)};
    float: left;
    // width: 80%;
    

  }

  @media only screen and (min-width: 992px) {
    ${({ md }) => md && getWidthString(md)};
    float: left;
        // width: 80%;


  }

  @media only screen and (min-width: 1200px) {
    ${({ lg }) => lg && getWidthString(lg)};
    float: left;
    // margin: 80px;
        width: 30%;
        display: inline;

  }
`

export default function Footer (props) {
  return (
    <div>
      {/* <TableFooter> */}
        <Row >
          <Column xs='4' md='8' lg='4'>
            <div style={{ color: 'orange' }}> Lorem ipsum</div>
          </Column>
          <Column xs='4' md='2' lg='4'>
            <div style={{ color: 'orange'}}> Lorem ipsum</div>
          </Column>
          <Column xs='4' md='2' lg='4'>
            <div style={{ color: 'orange' }}> Lorem ipsum</div>
          </Column>
        </Row>
      {/* </TableFooter> */}
    </div>
  )
}
