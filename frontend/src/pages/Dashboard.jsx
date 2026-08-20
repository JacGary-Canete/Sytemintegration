import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Dashboard() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')

  useEffect(() => {
    if (!username) {
      navigate('/')
    }
  }, [username, navigate])

  const handleLogout = () => {
    localStorage.removeItem('username')
    navigate('/')
  }

  if (!username) {
    return null
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {username}!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard