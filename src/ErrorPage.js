import React from 'react'
import {withRouter} from 'react-router-dom';
import './ErrorPage.css'

class ErrorPage extends React.Component {
  render() {
    return (
    <div className='error-prompt'>
      <h3>Sorry, that folder or note doesn't exist.</h3>
      <button onClick={() => this.props.history.push('/')}className='try-again'>Try Again</button>
    </div>
    )
  }
}

export default withRouter(ErrorPage);