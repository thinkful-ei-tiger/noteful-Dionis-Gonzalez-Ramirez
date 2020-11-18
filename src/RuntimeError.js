import React from 'react'
import ErrorPage from './DefaultPages/ErrorPage'

class RuntimeError extends React.Component {
  state = {hasError: false}

  static getDerivedStateFromError() {
    return {hasError: true}
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />
    }
    return this.props.children
  }
}

export default RuntimeError