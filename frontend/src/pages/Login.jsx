import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/api'
import AuthContext from '../context/AuthContext'
import './Auth.css'

function Login() {
  const [email, setEmail] = useState('admin@sweetshop.com')
  const [password, setPassword] = useState('password123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const data = await loginUser(email, password)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      setUser(data.user)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Sweet Shop Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
        <p>
          Don't have an account? <a href="/register">Register here</a>
        </p>
        <div className="demo-creds">
          <p><strong>Demo Credentials:</strong></p>
          <p>Email: admin@sweetshop.com</p>
          <p>Password: password123</p>
        </div>
      </div>
    </div>
  )
}

export default Login
