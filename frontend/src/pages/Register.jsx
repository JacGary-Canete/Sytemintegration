import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!username.trim() || !password.trim()) {
      setError('Username and password are required.')
      return
    }

    axios.post('http://localhost:8080/api/register', {
      username: username,
      password: password
    })
      .then((response) => {
        setSuccess('Registration successful! You can now log in.')
        setUsername('')
        setPassword('')
      })
      .catch((error) => {
        if (error.response) {
          setError('Registration failed: ' + error.response.status)
        } else {
          setError('Could not connect to the server.')
        }
      })
  }

  return (
    <div>
      <h1>Register</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

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

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  )
}

export default Register