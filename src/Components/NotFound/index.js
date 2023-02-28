import {Component} from 'react'

import './index.css'

class NotFound extends Component {
  render() {
    return (
      <>
        <div className="notfound-div">
          <img
            src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
            alt="not found"
            className="failure-view-job-image"
          />
          <h1 className="oops-heading">Page Not Found</h1>
          <p className="oops-description">
            We are sorry, the page you requested could not be found
          </p>
        </div>
      </>
    )
  }
}
export default NotFound
