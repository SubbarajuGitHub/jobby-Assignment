import {Component} from 'react'

import './index.css'

class EmploymentTabItem extends Component {
  render() {
    const {eachJobTime, getUserSelectedJobTitles} = this.props
    const {label, employmentTypeId} = eachJobTime

    const SelectedJobTypeId = () => {
      getUserSelectedJobTitles(employmentTypeId)
    }
    return (
      <li className="job-items">
        <input
          type="checkbox"
          id="checbox"
          className="checbox-input"
          onClick={SelectedJobTypeId}
        />
        <label className="jobs-timing" htmlFor="checkbox">
          {label}
        </label>
      </li>
    )
  }
}
export default EmploymentTabItem
