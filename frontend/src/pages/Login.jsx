import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Username and password are required.')
      return
    }

    axios.post('http://localhost:8080/api/login', {
      username: username,
      password: password
    })
      .then((response) => {
        if (response.data === 'Login successful') {
          localStorage.setItem('username', username)
          navigate('/dashboard')
        } else {
          setError(response.data)
        }
      })
      .catch((error) => {
        if (error.response) {
          setError('Login failed: ' + error.response.status)
        } else {
          setError('Could not connect to the server.')
        }
      })
  }

  return (
    <div>
      <h1>Login</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  )
}

export default Login