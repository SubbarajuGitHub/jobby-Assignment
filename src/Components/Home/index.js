import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect, Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div>
        <Header />
        <div className="home-second-div">
          <div className="home-second-first-div">
            <h1 className="home-heading">Find The Job That Fits Your Life</h1>
            <p className="home-description">
              Millions of people are searching for jobs,salary
              information,company reviews.Find the job that fits your abilities
              and potential.
            </p>
            <Link to="/jobs">
              <button type="button" className="find-jobs-button">
                Find Jobs
              </button>
            </Link>
          </div>
          <div className="home-second-second-div">
            <img
              src="https://assets.ccbp.in/frontend/react-js/home-lg-bg.png"
              alt="website logo"
              className="home-lg-logo"
            />
          </div>
        </div>
      </div>
    )
  }
}
export default Home
