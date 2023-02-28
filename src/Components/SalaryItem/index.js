import {Component} from 'react'

import './index.css'

class SalaryTabItem extends Component {
  render() {
    const {eachSalaryItem, getUserSelectedSalaryRangeJobs} = this.props
    const {label, salaryRangeId} = eachSalaryItem

    const getJobsOnSalaryLPA = () => {
      getUserSelectedSalaryRangeJobs(salaryRangeId)
    }
    return (
      <li className="job-items">
        <input
          type="radio"
          id="checbox"
          className="checbox-input"
          onChange={this.getSelectedJobTimings}
          name="option"
          onClick={getJobsOnSalaryLPA}
        />
        <label className="jobs-timing" htmlFor="checkbox">
          {label}
        </label>
      </li>
    )
  }
}
export default SalaryTabItem
