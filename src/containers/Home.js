import React from 'react'
import axios from 'axios'
import TopNav from '../components/TopNav'
import Modal from '../components/Modal'
import Add from '../components/Add'
import Card from '../components/Card'


export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      modal: false,
      list: []
    }
  }

  componentDidMount() {
    axios.get('/api/gradients')
      .then(response => {
        const list = response.data
        this.setState({ list })
      })
      .catch(error => console.log(error))
  }

  showModal() {
    this.setState({ modal: true })
  }

  closeModal() {
    this.setState({ modal: false })
  }

  onSave(gradient) {
    let list = this.state.list

    list.unshift(gradient)
    this.setState({ list })

    this.closeModal()
  }

  render() {
    const isLogged = window.photoUser ? true : false
    const { modal } = this.state
    return (
      <div>
        <TopNav />
        <div className="cards">
          { isLogged && <a className="card item card-add" onClick={ this.showModal.bind(this) } href="#">Agregar gradiente</a> }
          {
            this.state.list.map(gradient => <Card
              className="item"
              key={ gradient._id }
              gradient={ gradient } />)
          }
        </div>
        { modal && <Modal onClose={ this.closeModal.bind(this) }>
          <Add onSave={ this.onSave.bind(this) } />
        </Modal> }
      </div>
    )
  }
}
