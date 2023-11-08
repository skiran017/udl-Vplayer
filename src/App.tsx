import Home from './pages/Home/Home'
import { Routes, Route } from 'react-router-dom'
import Upload from './pages/Upload/Upload'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Layout>
  )
}

export default App
