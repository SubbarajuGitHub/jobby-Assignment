import {Component} from 'react'

import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import {MdLocationOn} from 'react-icons/md'

import './index.css'

import SkillItem from '../SkillItemTab'

import SimilarJobItem from '../SimilarJobItem'

class JobItemDeatiledView extends Component {
  state = {
    JobsList: [],
    LifeAtCompanyList: [],
    SkillsList: [],
    SimilarJobsList: [],
  }

  componentDidMount() {
    this.GetDetailedJobViewData()
  }

  GetDetailedJobViewData = async () => {
    const {
      JobsList,
      LifeAtCompanyList,
      SkillsList,
      SimilarJobsList,
    } = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const FetchedData = await fetch(url, options)
    const data = await FetchedData.json()

    const JobDetails = data.job_details
    const ConvertedJobDetails = {
      companyLogoUrl: JobDetails.company_logo_url,
      companyWebsiteUrl: JobDetails.company_website_url,
      employmentType: JobDetails.employment_type,
      id: JobDetails.id,
      jobDescription: JobDetails.job_description,
      location: JobDetails.location,
      packagePerAnnum: JobDetails.package_per_annum,
      rating: JobDetails.rating,
    }

    const LifeAtCompany = JobDetails.life_at_company
    const ConvertedLifeAtCompany = {
      description: LifeAtCompany.description,
      imageUrl: LifeAtCompany.image_url,
    }

    const SkillsData = JobDetails.skills
    const ConvertedSkillsData = SkillsData.map(each => ({
      imageUrl: each.image_url,
      name: each.name,
    }))

    const SimilarJobs = data.similar_jobs
    const ConvertedSimilarJobs = SimilarJobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      rating: each.rating,
      title: each.title,
    }))
    this.setState({
      JobsList: ConvertedJobDetails,
      LifeAtCompanyList: ConvertedLifeAtCompany,
      SkillsList: ConvertedSkillsData,
      SimilarJobsList: ConvertedSimilarJobs,
    })
  }

  renderSuccessDetailedPage = () => {
    const {
      JobsList,
      LifeAtCompanyList,
      SkillsList,
      SimilarJobsList,
    } = this.state

    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      packagePerAnnum,
      location,
      rating,
      id,
    } = JobsList

    const {title} = SimilarJobsList
    console.log(title)

    const {imageUrl, description} = LifeAtCompanyList
    return (
      <div className="black-bg">
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
          <button type="button" className="logout-button">
            Logout
          </button>
        </div>
        {/* navbar ends here */}
        <div className="job-div second-one">
          <div className="logo-container">
            <img
              src={companyLogoUrl}
              className="company-logo"
              alt="job details company logo"
            />
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
            <h1 className="job-description-description">{jobDescription}</h1>
          </div>
          {/* deatiled item copied ends here */}
          {/* Skills Starts from here */}
          <h1 className="skills-heading">Skills</h1>
          <div>
            <ul className="skills-unordered-list">
              {SkillsList.map(EachSkill => (
                <SkillItem EachSkill={EachSkill} />
              ))}
            </ul>
          </div>
          {/* skill item upto here */}
          <h1 className="company-heading">Life at Company</h1>
          <div className="company-div">
            {/* Life at Company starts Here */}
            <h1 className="company-description">{description}</h1>
            <img src={imageUrl} className="company-image" />
          </div>
        </div>
        {/* deatiled item upto here */}
        <h1 className="similar-jobs">Similar Jobs</h1>
        <ul className="similar-job-unordered-list">
          {SimilarJobsList.map(EachSimilarJob => (
            <SimilarJobItem Each={EachSimilarJob} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return <div>{this.renderSuccessDetailedPage()}</div>
  }
}
export default JobItemDeatiledView
