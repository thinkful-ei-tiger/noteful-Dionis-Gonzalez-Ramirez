import React from 'react'
import {Link} from 'react-router-dom';
import './ErrorPage.css'

class ErrorPage extends React.Component {
  render() {
    const {path} = this.props;
    return (
    <div className='error-prompt'>
      <h3>Sorry, that folder or note doesn't exist.</h3>
      <Link to='/' className='try-again'>Try Again</Link>
    </div>
    )
  }
}

export default ErrorPage;