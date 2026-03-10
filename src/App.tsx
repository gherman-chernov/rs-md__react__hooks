import { Suspense } from 'react'
import './App.css'
import React from 'react'
import Login from './components/Login'

class ErrorBoundary extends React.Component<{ children: React.ReactNode }> {
  state = { hasError: false, error: '' }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true, error: error.message })
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message }
  }

  render() {
    if (this.state.hasError) {
      return <h1>{ this.state.error }</h1>
    }

    return this.props.children
  }
}

function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary>
        <Login />
      </ErrorBoundary>
    </Suspense>
  )
}

export default App
