import React from 'react';
import Header from './Header'
import FolderList from './FolderList'
// import './HomePage.css'

class HomePage extends React.Component {
  render() {
    return (
      <>
        <Header />
        <FolderList />
      </>
    )
  }
}

export default HomePage;