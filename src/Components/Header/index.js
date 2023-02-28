import {Component} from 'react'

import Cookies from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'

import './index.css'

class Header extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <div className="header-bg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="website-logo2"
          alt="website logo"
        />
        <div className="home-jobs">
          <Link to="/" className="link-items">
            <li className="home">Home</li>
          </Link>
          <Link to="jobs" className="link-items">
            <li className="jobs">Jobs</li>
          </Link>
        </div>
        <button
          type="button"
          className="logout-button"
          onClick={this.onClickLogout}
        >
          Logout
        </button>
      </div>
    )
  }
}
export default withRouter(Header)
