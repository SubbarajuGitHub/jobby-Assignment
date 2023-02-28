import {Component} from 'react'

import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import {MdLocationOn} from 'react-icons/md'

import './index.css'

class EachJobItemCard extends Component {
  render() {
    const {EachJobItem} = this.props
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      packagePerAnnum,
      location,
      rating,
      title,
      id,
    } = EachJobItem

    return (
      <li className="lists">
        <Link to={`/jobs/${id}`} className="links">
          <div className="job-div">
            <div className="logo-container">
              <img src={companyLogoUrl} className="company-logo" />
              <div className="title-div">
                <h1 className="devops-heading">{title}</h1>
                <div className="title-div-rating-div">
                  <AiFillStar className="star-icon" />
                  <div>
                    <p className="rating">{rating}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="location-jobtype-package-container">
              <div className="loaction-and-jobtype-div">
                <div className="location-container">
                  <MdLocationOn className="location-icon" />
                  <p className="location-heading">{location}</p>
                </div>
                <div className="jobtype-container">
                  <MdLocationOn className="location-icon" />
                  <p className="employment-heading-second">{employmentType}</p>
                </div>
              </div>
              <p className="package-lpa">{packagePerAnnum}</p>
            </div>
            <hr />
            <div className="job-description-container">
              <h1 className="job-description-heading">Description</h1>
              <p className="job-description-description">{jobDescription}</p>
            </div>
          </div>
        </Link>
      </li>
    )
  }
}
export default EachJobItemCard
