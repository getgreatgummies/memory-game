import React from 'react'
import ReactDOM from 'react-dom/client'
import MemoryGame from './MemoryGame'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MemoryGame />
  </React.StrictMode>,
)
