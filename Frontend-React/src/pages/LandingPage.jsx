import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import styles from './LandingPage.module.css'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={`${styles.card} fade-in-up`}>
        {/* Logo/Hero Section */}
        <div className={styles.hero}>
          <svg
            className={styles.illustration}
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Simplified workspace illustration */}
            <circle cx="100" cy="100" r="95" fill="var(--color-bg-light)" />
            
            {/* Desk/Table */}
            <rect x="40" y="120" width="120" height="10" fill="var(--color-primary)" />
            
            {/* Left leg */}
            <rect x="50" y="130" width="5" height="40" fill="var(--color-primary)" />
            
            {/* Right leg */}
            <rect x="145" y="130" width="5" height="40" fill="var(--color-primary)" />
            
            {/* Monitor */}
            <rect x="60" y="50" width="80" height="60" rx="4" fill="var(--color-primary)" />
            <rect x="65" y="55" width="70" height="50" fill="white" />
            
            {/* Keyboard */}
            <rect x="70" y="115" width="60" height="5" fill="var(--color-primary)" />
            
            {/* Person (simplified) */}
            <circle cx="140" cy="85" r="8" fill="var(--color-primary)" />
            <rect x="135" y="94" width="10" height="25" fill="var(--color-primary)" />
          </svg>
        </div>

        {/* Content */}
        <h1 className={styles.heading}>Hello !</h1>
        <p className={styles.subtitle}>
          Best place to write life stories and share your journey experiences
        </p>

        {/* Buttons */}
        <div className={styles.buttonGroup}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            onClick={() => navigate('/register')}
          >
            Signup
          </Button>
        </div>

        {/* Logo Text */}
        <div className={styles.logo}>VCode Academy</div>
      </div>
    </div>
  )
}
