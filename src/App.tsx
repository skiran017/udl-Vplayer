import Home from './pages/Home/Home'
import { Routes, Route } from 'react-router-dom'
import Upload from './pages/Upload/Upload'
import Layout from './components/Layout'
import List from './pages/List/List'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </Layout>
  )
}

export default App
