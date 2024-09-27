import { Container } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import UserPage from './pages/UserPage'
import PostPage from './pages/PostPage'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'

function App() {
  return (
    <Container maxW={{ base: '100%', sm: '90%', md: '85%', lg: '672px' }} mb={16}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/auth" element={<AuthPage />}/>
        <Route path="/:username" element={<UserPage />}/>
        <Route path="/:username/post/:pid" element={<PostPage />}/>
      </Routes>
    </Container>
  )
}

export default App
