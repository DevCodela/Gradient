import React, { Component } from 'react'


export default class Card extends Component {
  render() {
    const {
      angle,
      colors
    } = this.props.gradient

    const color1 = colors[0].position ? `#${colors[0].code} ${colors[0].position}%` : `#${colors[0].code}`

    const color2 = colors[1].position ? `#${colors[1].code} ${colors[1].position}%` : `#${colors[1].code}`

    const style = {
      backgroundImage: `linear-gradient(${angle}deg, ${color1}, ${color2})`
    }

    const classNameCard = this.props.className ? `card ${this.props.className}`: 'card'

    return(
      <div className={ classNameCard } style={ style }>
      </div>
    )
  }
}
