import {Component} from 'react'

import './index.css'

class SkillItem extends Component {
  render() {
    const {EachSkill} = this.props
    const {imageUrl, name} = EachSkill
    return (
      <li className="skills-list-items">
        <div className="skills-div">
          <img src={imageUrl} className="skill-image" />
          <p className="language-name">{name}</p>
        </div>
      </li>
    )
  }
}
export default SkillItem
