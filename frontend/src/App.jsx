import { Container } from '@chakra-ui/react'
import { Routes, Route, Navigate } from 'react-router-dom'
import UserPage from './pages/UserPage'
import PostPage from './pages/PostPage'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import { useRecoilValue } from 'recoil'
import userAtom from './atoms/userAtom'

function App() {
  const user = useRecoilValue(userAtom);

  return (
    <Container maxW={{ base: '100%', sm: '90%', md: '85%', lg: '672px' }} mb={16}>
      <Header />
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to={'auth'} />}/>
        <Route path="/auth" element={user ? <Navigate to={'/'} /> : <AuthPage />}/>

        <Route path="/:username" element={<UserPage />}/>
        <Route path="/:username/post/:pid" element={<PostPage />}/>
      </Routes>
    </Container>
  )
}

export default App
