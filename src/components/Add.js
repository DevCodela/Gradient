import React, { Component } from 'react'
import axios from 'axios'
import Card from './Card'


export default class Add extends Component {
  constructor() {
    super()
    this.state = {
      angle: 0,
      colors: [
        {
          code: '000'
        },
        {
          code: 'FFF'
        }
      ]
    }
  }

  changeAngle(e) {
    const angle = e.target.value
    this.setState({ angle })
  }

  changeColor(field, i, e) {
    const value = e.target.value
    let colors = this.state.colors
    colors[i][field] = value
    this.setState({ colors })
  }

  save(e) {
    e.preventDefault()
    axios.post('/api/gradients', this.state)
      .then(response => {
        const data = response.data
        if (data.success) {
          this.props.onSave(data.gradient)
        }
      })
      .catch(error => console.log(error))
  }

  render() {
    return(
      <div>
        <header className="modal-header">
          <strong>Agregar gradiente</strong>
        </header>
        <main className="modal-body">
          <form onSubmit={ this.save.bind(this) }>
            <div className="form-row">
              <div className="form-col">
                <label className="label">Angulo</label>
                <div className="input-group">
                  <input
                    onChange={ this.changeAngle.bind(this) }
                    className="input"
                    type="number"
                    placeholder="Angulo" />
                  <span className="input-group-text">deg</span>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <label className="label">Color 1</label>
                <div className="input-group">
                  <span className="input-group-text">#</span>
                  <input
                    onChange={ this.changeColor.bind(this, 'code', 0) }
                    className="input"
                    type="text"
                    placeholder="Color hexadecimal" />
                </div>
              </div>
              <div className="form-col">
                <label className="label">Posición</label>
                <div className="input-group">
                  <input
                    onChange={ this.changeColor.bind(this, 'position', 0) }
                    className="input"
                    type="number"
                    placeholder="Posición" />
                  <span className="input-group-text">%</span>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <label className="label">Color 2</label>
                <div className="input-group">
                  <span className="input-group-text">#</span>
                  <input
                    onChange={ this.changeColor.bind(this, 'code', 1) }
                    className="input"
                    type="text"
                    placeholder="Color hexadecimal" />
                </div>
              </div>
              <div className="form-col">
                <label className="label">Posición</label>
                <div className="input-group">
                  <input
                    onChange={ this.changeColor.bind(this, 'position', 1) }
                    className="input"
                    type="number"
                    placeholder="Posición" />
                  <span className="input-group-text">%</span>
                </div>
              </div>
            </div>
            <Card gradient={ this.state } />
            <button className="btn" type="submit">Agregar gradiente</button>
          </form>
        </main>
      </div>
    )
  }
}
