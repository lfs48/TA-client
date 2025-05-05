import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Landing from '@/pages/landing'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
