import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, User, Lock } from 'lucide-react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Toast from '../components/ui/Toast'
import { api } from '../services/api'
import { useAuth } from '../hooks/useAuth'
import styles from './AuthPages.module.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.username.trim()) {
      newErrors.username = 'Username or email is required'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      const result = await api.login(formData.username, formData.password)

      if (result.username) {
        setUser({ username: result.username })
        setToast({
          message: 'Login successful!',
          type: 'success',
        })
        setTimeout(() => {
          navigate('/dashboard')
        }, 500)
      } else {
        setToast({
          message: result.message || 'Login failed',
          type: 'error',
        })
      }
    } catch (error) {
      if (error.status === 401) {
        setToast({
          message:
            'Invalid credentials. Please check your username and password.',
          type: 'error',
        })
      } else {
        setToast({
          message: error.message || 'An error occurred during login',
          type: 'error',
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.card} fade-in-up`}>
        {/* Back Button */}
        <button
          className={styles.backButton}
          onClick={() => navigate('/')}
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Header */}
        <h1 className={styles.heading}>Welcome!</h1>
        <p className={styles.subtitle}>Sign in to continue</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="text"
            name="username"
            placeholder="amish@gmail.com"
            icon={User}
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            errorMessage={errors.username}
            disabled={loading}
            autoFocus
          />

          <Input
            type="password"
            name="password"
            placeholder="••••••••"
            icon={Lock}
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            errorMessage={errors.password}
            disabled={loading}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            Login
          </Button>
        </form>

        {/* Forgot Password Link */}
        <Link to="/forgot-password" className={styles.forgotPassword}>
          Forgot Password?
        </Link>

        {/* Divider */}
        <div className={styles.divider}>
          <span>or</span>
        </div>

        {/* Social Login */}
        <div className={styles.socialButtons}>
          <button className={styles.socialButton} disabled={loading}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          </button>
          <button className={styles.socialButton} disabled={loading}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>
          <button className={styles.socialButton} disabled={loading}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.12-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8.905-.24 1.81-.78 2.88-.67 1.39.12 2.78.72 3.3 1.85-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.48-2.83 3.23l-.42-.07z" />
            </svg>
          </button>
        </div>

        {/* Sign Up Link */}
        <p className={styles.authLink}>
          Don't have an account?{' '}
          <Link to="/register">Sign up</Link>
        </p>
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
