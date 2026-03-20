import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import OtpInput from '../components/ui/OtpInput'
import Button from '../components/ui/Button'
import Toast from '../components/ui/Toast'
import { useOtpTimer } from '../hooks/useOtpTimer'
import { api } from '../services/api'
import styles from './OtpPage.module.css'

export default function OtpPage({ testMode = false }) {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || (testMode ? 'test@example.com' : null)

  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const { secondsLeft, canResend, reset } = useOtpTimer(60)

  useEffect(() => {
    if (!email && !testMode) {
      navigate('/register')
    }
  }, [email, testMode, navigate])

  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(@.*)/, '$1***$3')
    : 'your email'

  const handleOtpComplete = async (otpValue) => {
    if (testMode) {
      // In test mode, just show success
      setToast({
        message: 'Test OTP: ' + otpValue + ' (Demo mode)',
        type: 'success',
      })
      return
    }

    setLoading(true)
    setError(false)

    try {
      const result = await api.verifyEmail(email, otpValue)

      if (result.success === 'true') {
        setToast({
          message: 'Email verified successfully!',
          type: 'success',
        })
        setTimeout(() => {
          navigate('/login')
        }, 500)
      } else {
        setError(true)
        setOtp('')
        setToast({
          message: result.message || 'Verification failed',
          type: 'error',
        })
      }
    } catch (err) {
      setError(true)
      setOtp('')
      setToast({
        message: err.message || 'An error occurred',
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    if (testMode) {
      setToast({
        message: 'Test mode: OTP would be resent',
        type: 'success',
      })
      reset()
      return
    }

    setResendLoading(true)
    try {
      await api.resendOtp(email)
      setToast({
        message: 'OTP resent to your email',
        type: 'success',
      })
      reset()
    } catch (err) {
      setToast({
        message: err.message || 'Failed to resend OTP',
        type: 'error',
      })
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.card} fade-in-up`}>
        {/* Back Button */}
        <button
          className={styles.backButton}
          onClick={() => navigate(testMode ? '/' : '/register')}
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Header */}
        <h1 className={styles.heading}>Verify Email</h1>
        <p className={styles.subtitle}>Code sent to {maskedEmail}</p>

        {testMode && (
          <div
            style={{
              backgroundColor: '#fffbea',
              border: '1px solid #fde047',
              color: '#b45309',
              padding: '10px 15px',
              borderRadius: '8px',
              fontSize: '12px',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            🧪 TEST MODE - Enter any 6 digits to test
          </div>
        )}

        {/* OTP Input */}
        <OtpInput
          length={6}
          value={otp}
          onChange={setOtp}
          onComplete={handleOtpComplete}
          disabled={loading}
          error={error}
        />

        {/* Resend Section */}
        <div className={styles.resendSection}>
          <span className={styles.resendText}>
            Didn't receive a code?{' '}
            {canResend ? (
              <button
                className={styles.resendButton}
                onClick={handleResendOtp}
                disabled={resendLoading}
              >
                Resend
              </button>
            ) : (
              <span className={styles.timer}>Resend in {secondsLeft}s</span>
            )}
          </span>
        </div>

        {/* Info Text */}
        <p className={styles.infoText}>
          Enter the 6-digit code sent to your email address
        </p>

        {/* Submit Manual Button (fallback) */}
        {otp.length === 6 && (
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => handleOtpComplete(otp)}
            loading={loading}
            disabled={loading}
          >
            Verify
          </Button>
        )}
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
