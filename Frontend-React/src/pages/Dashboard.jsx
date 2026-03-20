import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import Button from '../components/ui/Button'
import Spinner from '../components/ui/Spinner'
import Toast from '../components/ui/Toast'
import { useAuth } from '../hooks/useAuth'
import { api } from '../services/api'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const [userDetails, setUserDetails] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    // Fetch user details on mount
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/user`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        if (response.ok) {
          const data = await response.json()
          setUserDetails(data)
        }
      } catch (error) {
        console.error('Failed to fetch user details:', error)
      } finally {
        setLoadingUser(false)
      }
    }

    fetchUserDetails()
  }, [])

  const handleLogout = async () => {
    setLoading(true)
    try {
      await api.logout()
      logout()
      setToast({
        message: 'Logged out successfully',
        type: 'success',
      })
      setTimeout(() => {
        navigate('/login')
      }, 500)
    } catch (error) {
      // Logout anyway even if endpoint fails
      logout()
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }

  const displayUser = userDetails || user

  return (
    <div className={styles.container}>
      <div className={`${styles.card} fade-in-up`}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.heading}>
              Welcome, {displayUser?.username || 'User'}!
            </h1>
            <p className={styles.subtitle}>
              You are successfully logged in to your account
            </p>
          </div>
        </div>

        {/* User Info Card */}
        <div className={styles.infoCard}>
          <div className={styles.infoRow}>
            <span className={styles.label}>Username:</span>
            <span className={styles.value}>
              {displayUser?.username || 'Loading...'}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Email:</span>
            <span className={styles.value}>
              {loadingUser ? (
                <span style={{ fontSize: '14px', color: 'var(--color-text-light)' }}>
                  Loading...
                </span>
              ) : (
                displayUser?.email || 'Not available'
              )}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Account Status:</span>
            <span className={styles.status}>
              {displayUser?.verified === 'true' || displayUser?.verified === true
                ? 'Verified ✓'
                : 'Pending'}
            </span>
          </div>
        </div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          <h2 className={styles.sectionHeading}>Account Features</h2>
          <div className={styles.featuresList}>
            <div className={styles.featureItem}>
              <span className={styles.featureName}>Profile Settings</span>
              <p className={styles.featureDesc}>Manage your account details</p>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureName}>Security</span>
              <p className={styles.featureDesc}>Update your password and preferences</p>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureName}>Preferences</span>
              <p className={styles.featureDesc}>Customize your experience</p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          variant="danger"
          size="lg"
          fullWidth
          onClick={handleLogout}
          loading={loading}
          disabled={loading}
          icon={loading ? undefined : LogOut}
        >
          Logout
        </Button>
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
