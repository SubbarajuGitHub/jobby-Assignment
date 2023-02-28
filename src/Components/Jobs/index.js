import {Component} from 'react'

import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import EmploymentTabItem from '../EmploymentItem'

import SalaryTabItem from '../SalaryItem'

import EachJobItemCard from '../EachJobItemCard'

import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstantsForJob = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiStatusProfileConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    ProfiledetailsList: [],
    allJobsLists: [],
    employementType: [],
    packagelpa: '',
    userJobSearch: '',
    JobapiStatus: apiStatusConstantsForJob.inProgress,
    ProfileapiStatus: '',
  }

  componentDidMount() {
    this.UserProfileFetching()
    this.GetJobDetails()
  }

  getUserJobDetails = event => {
    this.setState({userJobSearch: event.target.value}, this.GetJobDetails)
  }

  getUserSelectedJobTitles = employmentTypeId => {
    this.setState({employementType: employmentTypeId}, this.GetJobDetails)
  }

  getUserSelectedSalaryRangeJobs = salaryRangeId => {
    this.setState({packagelpa: salaryRangeId}, this.GetJobDetails)
  }

  /* user Details Fetching  */

  UserProfileFetching = async () => {
    const {ProfiledetailsList, JobapiStatus, ProfileapiStatus} = this.state

    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const fetchUserProfile = await fetch(url, options)

    /* if user profile fetched properly */
    if (fetchUserProfile.ok === true) {
      const ProfileData = await fetchUserProfile.json()
      const ExtractProfileDetails = ProfileData.profile_details
      const ConvertProfileData = {
        profileImageUrl: ExtractProfileDetails.profile_image_url,
        shortBio: ExtractProfileDetails.short_bio,
        name: ExtractProfileDetails.name,
      }
      this.setState({
        ProfiledetailsList: ConvertProfileData,
        JobapiStatus: apiStatusConstantsForJob.success,
        ProfileapiStatus: apiStatusProfileConstants.success,
      })
    } else {
      this.setState = {
        JobapiStatus: apiStatusConstantsForJob.failure,
        ProfileapiStatus: apiStatusProfileConstants.failure,
      }
    }
  }
  /* user profile ends with here */

  /*  rendering successuser profile */
  renderSuccessProfile = () => {
    const {ProfiledetailsList} = this.state
    const {profileImageUrl, name, shortBio} = ProfiledetailsList
    return (
      <div className="profile-bg">
        <img src={profileImageUrl} />
        <p className="profile-name">{name}</p>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  /*  rendering Failure  profile */

  renderFailureProfile = () => {
    const {userProfile} = this.state
    return (
      <div className="user-profile-failure">
        <div className="profile-failure-div">
          <button type="button" className="profile-failure-button">
            Retry
          </button>
        </div>
      </div>
    )
  }

  /* Jobs Details Fetching  */

  GetJobDetails = async () => {
    const {
      allJobsLists,
      employementType,
      packagelpa,
      userJobSearch,
    } = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employementType}&minimum_package=${packagelpa}&search=${userJobSearch}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const fetchJobDeatils = await fetch(url, options)

    /* if jobs details success */

    if (fetchJobDeatils.ok === true) {
      const JobDeatilsData = await fetchJobDeatils.json()
      const convertJobsData = JobDeatilsData.jobs
      const JobsRealData = convertJobsData.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        packagePerAnnum: each.package_per_annum,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({allJobsLists: JobsRealData})
    } else {
      this.setState({JobFailureMode: true})
    }
  }

  /* rendering job details success */
  renderJobsSuccess = () => {
    const {allJobsLists} = this.state
    return (
      <div>
        <Header />
        <div className="jobs-success-main-div">
          <div className="jobs-success-left-div">
            {this.renderProfile()}
            <hr />
            <div className="employment-bg">
              <h1 className="employment-heading">Type of Employment</h1>
              <ul className="jobs-ulist">
                {employmentTypesList.map(eachJobTime => (
                  <EmploymentTabItem
                    eachJobTime={eachJobTime}
                    key={eachJobTime.id}
                    getUserSelectedJobTitles={this.getUserSelectedJobTitles}
                  />
                ))}
              </ul>
              <hr />
            </div>
            <div className="employment-bg">
              <h1 className="employment-heading">Salary Range</h1>
              <ul className="jobs-ulist">
                {salaryRangesList.map(eachSalaryItem => (
                  <SalaryTabItem
                    eachSalaryItem={eachSalaryItem}
                    key={eachSalaryItem.id}
                    getUserSelectedSalaryRangeJobs={
                      this.getUserSelectedSalaryRangeJobs
                    }
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="jobs-success-right-div">
            <input
              type="search"
              placeholder="Search"
              className="search-input-jobs"
              onChange={this.getUserJobDetails}
            />
            {allJobsLists.map(EachJobItem => (
              <EachJobItemCard EachJobItem={EachJobItem} key={EachJobItem.id} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  /* rendering job details Failure */
  renderFailureJobDetails = () => {
    const {JobFailureMode} = this.state
    return (
      <div>
        <Header />
        <div className="jobs-success-main-div">
          <div className="jobs-success-left-div">
            {this.renderFailureProfile()}
            <hr />
            <div className="employment-bg">
              <h1 className="employment-heading">Type of Employment</h1>
              <ul className="jobs-ulist">
                {employmentTypesList.map(eachJobTime => (
                  <EmploymentTabItem
                    eachJobTime={eachJobTime}
                    key={eachJobTime.id}
                    getUserSelectedJobTitles={this.getUserSelectedJobTitles}
                  />
                ))}
              </ul>
              <hr />
            </div>
            <div className="employment-bg">
              <h1 className="employment-heading">Salary Range</h1>
              <ul className="jobs-ulist">
                {salaryRangesList.map(eachSalaryItem => (
                  <SalaryTabItem
                    eachSalaryItem={eachSalaryItem}
                    key={eachSalaryItem.id}
                    getUserSelectedSalaryRangeJobs={
                      this.getUserSelectedSalaryRangeJobs
                    }
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="failure-job-div">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
              className="failure-view-job-image"
            />
            <h1 className="oops-heading">Oops! Something Went Wrong</h1>
            <p className="oops-description">
              We cannot seem to find page you are looking for
            </p>
            <div className="failure-retry-button">
              <button type="button" className="profile-failure-button">
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* rendering loading view */
  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {ProfileapiStatus} = this.state

    switch (ProfileapiStatus) {
      case apiStatusProfileConstants.success:
        return this.renderSuccessProfile()
      case apiStatusProfileConstants.failure:
        return this.renderFailureProfile()
      default:
        return null
    }
  }

  renderJobsFinalMode = () => {
    const {JobapiStatus} = this.state

    switch (JobapiStatus) {
      case apiStatusConstantsForJob.success:
        return this.renderJobsSuccess()
      case apiStatusConstantsForJob.failure:
        return this.renderFailureJobDetails()
      case apiStatusConstantsForJob.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderJobsFinalMode()}</div>
  }
}
export default Jobs
