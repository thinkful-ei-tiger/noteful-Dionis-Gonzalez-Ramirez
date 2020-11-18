import React from 'react'
import logo from './img/logo.svg'
import './HomePage.css'

class HomePage extends React.Component {
  render() {
    return (
      <div className='homepage'>
        <h2>Welcome to Noteful!</h2>
        <img src={logo} alt='logo' />
      </div>
    )
  }
}

export default HomePage;