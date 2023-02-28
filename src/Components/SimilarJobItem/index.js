import {Component} from 'react'

import {AiFillStar} from 'react-icons/ai'

import './index.css'

class SimilarJobItem extends Component {
  render() {
    const {Each} = this.props
    const {companyLogoUrl, jobDescription, id, location, rating, title} = Each
    return (
      <li className="similar-jobs-div">
        <div className="logo-container other">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="similar job company logo"
          />
          <div className="title-div">
            <h1 className="devops-heading2">{title}</h1>
            <div className="title-div-rating-div">
              <AiFillStar className="star-icon" />
              <div>
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
        </div>
        <h1 className="Description">Description</h1>
        <p className="jobDescription">{jobDescription}</p>
      </li>
    )
  }
}
export default SimilarJobItem
