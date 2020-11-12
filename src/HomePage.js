import React from 'react';
import Header from './Header'
import FolderList from './FolderList'
import FolderDropdown from './FolderDropdown'

class HomePage extends React.Component {
  render() {
    return (
      <>
        <Header />
        <FolderList />
        <FolderDropdown />
      </>
    )
  }
}

export default HomePage;