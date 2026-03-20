import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Mail } from 'lucide-react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Toast from '../components/ui/Toast'
import styles from './AuthPages.module.css'

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email.trim()) {
      setError('Email is required')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email')
      return
    }

    setLoading(true)
    try {
      // Backend endpoint not yet implemented
      setToast({
        message:
          'Password reset instructions sent to your email (feature coming soon)',
        type: 'success',
      })
      setIsSubmitted(true)
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      setToast({
        message: err.message || 'Failed to process request',
        type: 'error',
      })
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
          onClick={() => navigate('/login')}
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Header */}
        <h1 className={styles.heading}>Reset Password</h1>
        <p className={styles.subtitle}>
          Enter your email address and we'll send you a link to reset your
          password
        </p>

        {!isSubmitted ? (
          /* Form */
          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              type="email"
              placeholder="amish@gmail.com"
              icon={Mail}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              error={!!error}
              errorMessage={error}
              disabled={loading}
              autoFocus
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              Send Reset Link
            </Button>
          </form>
        ) : (
          /* Confirmation Message */
          <div className={styles.form}>
            <p style={{ textAlign: 'center', color: 'var(--color-success)' }}>
              ✓ Check your email for reset instructions
            </p>
          </div>
        )}

        {/* Back to Login Link */}
        <p className={styles.authLink}>
          Remember your password?{' '}
          <Link to="/login">Sign in</Link>
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
