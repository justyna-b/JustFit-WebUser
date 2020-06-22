import React from 'react'
import AuthService from './AuthService'
import { Form, InputGroup, Container, Row, Col } from 'react-bootstrap'
import LoginCarousel from './LoginCarousel.js'
import '../../styles/LoginPageStyle.css'

class AltLoginPageView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      message: '',
      passwordHidden: true,
      counter: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.Auth = new AuthService()
  }

  handleSubmit = event => {
    event.preventDefault()

    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        this.props.history.replace('/home')
      })
      .catch(error => {
        this.setState({
          message: 'NIEPOPRAWNE DANE UŻYTKOWNIKA: BŁĘDNY LOGIN BĄDŹ HASŁO'
        })
      })
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentWillMount () {
    if (this.Auth.loggedIn()) this.props.history.replace('/home')
  }

  render () {
    return (
      <div style={{ height: '100%' }}>
        <Container
          fluid
          style={{ paddingLeft: '0px', paddingRight: '0px', height: '100%' }}
          className='justify-content-md-center login-page-container'
        >
          <Row
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              marginRight: '-15px',
              marginLeft: '-15px',
              height: '100vh'
            }}
          >
            <Col style={{ backgroundColor: 'orange' }}>
              <Col
                lg={10}
                sm={12}
                md={10}
                style={{
                  paddingLeft: '15%',
                  marginTop: '30%',
                  paddingBottom: '40%'
                }}
              >
                <h1 style={{ fontWeight: 'bold', paddingLeft: '25%' }}>
                  {' '}
                  JUST FIT{' '}
                </h1>
                <div
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    display: 'inline-block',
                    paddingBottom: '10px',
                    color: 'red'
                  }}
                >
                  {this.state.message}
                </div>
                <form onSubmit={this.handleSubmit}>
                  <Form.Group controlId='formBasicEmail'>
                    <InputGroup>
                      <Form.Control
                        type='email'
                        placeholder='Email'
                        name='email'
                        onChange={this.handleChange}
                        required
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group controlId='formBasicPassword'>
                    <InputGroup>
                      <InputGroup.Prepend></InputGroup.Prepend>
                      <Form.Control
                        type='password'
                        placeholder='Hasło'
                        name='password'
                        onChange={this.handleChange}
                        required
                      />
                    </InputGroup>
                  </Form.Group>
                  <div>
                    <button className='login-button' type='submit'>
                      Zaloguj
                    </button>
                  </div>
                </form>
              </Col>
            </Col>
            <Col className='carousel' style={{ backgroundColor: 'black' }}>
              <LoginCarousel />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
export default AltLoginPageView
