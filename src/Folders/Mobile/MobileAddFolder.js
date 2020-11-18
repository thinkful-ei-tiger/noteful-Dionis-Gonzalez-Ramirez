import React from 'react'
import {Link} from 'react-router-dom'
import './MobileAddFolder.css'

export default class MobileAddFolder extends React.Component {

  render() {
    return (
      <Link
        to='/mobile-folder'
        id='add-folder'
      >Add Folder
      </Link>
    )
  }
}

