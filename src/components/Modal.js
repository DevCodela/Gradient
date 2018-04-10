import React, { Component } from 'react'


export default class Modal extends Component {
  close() {
    this.props.onClose()
  }

  render() {
    return(
      <div className="modal">
        <div className="modal-content">
          <span onClick={ this.close.bind(this) } className="modal-close">x</span>
          <div className="modal-dialog">
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}
