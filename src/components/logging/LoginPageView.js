import React from 'react'
import AuthService from './AuthService'
import { Form, InputGroup } from 'react-bootstrap'

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
      <div>
        <div>
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
              <button type='submit'>Zaloguj</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default AltLoginPageView
