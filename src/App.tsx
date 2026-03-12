import { Suspense, useState } from 'react'
import './App.css'
import React from 'react'
import { Login } from './components/Login'
import FetchDemo from './components/FetchDemo/FetchDemo'
import LocalStorageDemo from './components/LocalStorageDemo/LocalStorage'
import HoverDemo from './components/HoverDemo/HoverDemo'
import ViewportSizeDemo from './components/ViewportSizeDemo/ViewportSizeDemo'

type TASK_TYPE = 'LOGIN' | 'FETCH' | 'LOCAL_STORAGE' | 'HOVER' | 'VIEWPORT_SIZE' | 'WINDOW_SCROLL' | 'TOGGLE_PLUS'
const CURRENT_TASK: TASK_TYPE = 'VIEWPORT_SIZE'

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
  const [currentTask, setCurrentTask] = useState(CURRENT_TASK)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary>
        <div style={{marginBottom: '10px'}}>
          <p>Select task type</p>
          <select value={currentTask} onChange={(e) => {setCurrentTask(e.target.value as TASK_TYPE)}}>
            <option value="LOGIN">Login (hook task 1)</option>
            <option value="FETCH">Fetch (user hook task 1)</option>
            <option value="LOCAL_STORAGE">Local Storage (user hook task 2)</option>
            <option value="HOVER">Hover (user hook task 3)</option>
            <option value="VIEWPORT_SIZE">Viewport size (user hook extra task 1)</option>
            <option value="WINDOW_SCROLL">Window scroll (user hook extra task 2)</option>
            <option value="TOGGLE_PLUS">Toggle plus (user hook extra task 2)</option>
          </select>
        </div>
        <TaskSelector currentTask={currentTask} />
      </ErrorBoundary>
    </Suspense>
  )
}

function TaskSelector({ currentTask }: { currentTask: TASK_TYPE  }) {
  switch (currentTask) {
    case 'LOGIN':
      return <Login />
    case 'FETCH':
      return <FetchDemo />
    case 'LOCAL_STORAGE':
      return <LocalStorageDemo />
    case 'HOVER':
      return <HoverDemo />
    case 'VIEWPORT_SIZE':
      return <ViewportSizeDemo />
    default:
      return null
  }
}

export default App
