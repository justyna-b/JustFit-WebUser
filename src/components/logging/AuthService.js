import decode from 'jwt-decode'

export default class AuthService {
  constructor (domain) {
    this.fetch = this.fetch.bind(this)
    this.login = this.login.bind(this)
    this.getProfile = this.getProfile.bind(this)
  }

  login (username, password) {
    let base64 = require('base-64')
    return this.fetch(
      'http://justfitclient.pythonanywhere.com/account/client/properties/',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            'Basic' + ' ' + base64.encode(username + ':' + password)
        }
      }
    ).then(res => {
      this.setUsersAuthData(username, password)
    })
  }

  loggedIn () {
    const authData = this.getAuth()
    if (authData != null && authData !== '') {
      return true
    }
    return false
  }

  setUsersAuthData (username, password) {
    let base64 = require('base-64')
    let auth = base64.encode(username + ':' + password)
    localStorage.setItem('auth', auth)
  }

  getAuth () {
    return localStorage.getItem('auth')
  }

  logout () {
    localStorage.removeItem('auth')
  }

  getProfile () {
    return decode(this.getToken())
  }

  async fetch (url, options) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }

    if (this.loggedIn()) {
      headers['Authorization'] = 'Basic ' + this.getAuth()
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json())
  }

  _checkStatus (response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }
}
