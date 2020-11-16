import React from 'react';
import data from './data';
import './MobileNewFolder.css'

class MobileNewFolder extends React.Component {
  mobileAddFolder = (evt) => {
    evt.preventDefault();
    const newFolder = evt.target['folder-name'].value
    data.folders.push(
      {id: `folder-${data.folders.length+1}`, name: newFolder}
    )
    this.setState({folders: data.folders})
  }

  render() {
    return (
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            this.mobileAddFolder(evt);
            this.props.history.goBack();
          }}
          id='mobile-new-folder'
        >
          <input id='folder-name' type='text' />
          <button type='submit'>Add</button>
        </form>
    )
  }
}

export default MobileNewFolder;