import React from 'react'


export default class TopNav extends React.Component {
  render() {
    let $htmlUser

    if (window.photoUser && window.photoUser !== '') {
      $htmlUser = <div>
        <img className="topnav-user" src={ window.photoUser } alt=""/>
        <a href="/logout">Cerrar sesión</a>
      </div>
    } else {
      $htmlUser = <a className="topnav-login" href="/login/facebook">Ingresa con Facebook</a>
    }

    return (
      <div className="topnav">
        <strong>Gradient</strong>
        { $htmlUser }
      </div>
    )
  }
}
