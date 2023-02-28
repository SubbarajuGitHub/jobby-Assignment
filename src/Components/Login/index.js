import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
    displayErrorMessage: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  getUsername = event => {
    const {username} = this.state
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    const {password} = this.state
    this.setState({password: event.target.value})
  }

  GetLoginDetails = async event => {
    event.preventDefault()
    const {username, password, errorMessage, displayErrorMessage} = this.state

    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const fetchedData = await fetch(url, options)
    const data = await fetchedData.json()

    if (fetchedData.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({
        errorMessage: "*Username and Password didn't match",
        displayErrorMessage: true,
      })
    }
  }

  render() {
    const {username, password, errorMessage, displayErrorMessage} = this.state
    const displayingErrorMessage = displayErrorMessage ? errorMessage : ''
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-div">
        <div className="login-div">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form onSubmit={this.GetLoginDetails}>
            <label htmlFor="username" className="username">
              USERNAME
            </label>
            <br />
            <input
              type="text"
              id="username"
              onChange={this.getUsername}
              value={username}
              placeholder="Username"
              className="username-input"
            />
            <br />
            <label htmlFor="password" className="password">
              PASSWORD
            </label>
            <br />
            <input
              type="password"
              id="password"
              onChange={this.getPassword}
              value={password}
              placeholder="Password"
              className="password-input"
            />
            <br />
            <button type="submit" id="password" className="login-button">
              Submit
            </button>
            <p className="error-messege">{displayingErrorMessage}</p>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
