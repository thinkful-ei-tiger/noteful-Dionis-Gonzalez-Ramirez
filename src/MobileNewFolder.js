import React from 'react';
import data from './data';
import api from './api'
import {withRouter} from 'react-router-dom'
import './MobileNewFolder.css'

class MobileNewFolder extends React.Component {
  static defaultProps = {folderName: ''}

  mobileAddFolder = (evt) => {
    evt.preventDefault();
    const folderName = evt.target['folder-name'].value
    this.setState({folders: data.folders})
    api.addFolder(folderName)
    .then(this.history.push.goBack())

    
  }

  render() {
    return (
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            this.props.addFolder(evt.target['folder-name'].value)
            this.props.history.goBack();
          }}
          id='mobile-new-folder'
        >
          <input
            id='folder-name'
            type='text'
            // value={this.props.folderName}
          />
          <button type='submit'>Submit</button>
          <button type='button'
            onClick={() => this.props.history.goBack()}
          >Cancel</button>
        </form>
    )
  }
}

export default withRouter(MobileNewFolder);