import React from 'react';
import './NotePage.css'

class NotePage extends React.Component {
  render() {
    return (
      <div className='note'>
        <div>{this.props.match.params.note}</div>
      </div>
    )
  }
}

export default NotePage;