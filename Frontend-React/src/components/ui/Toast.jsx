import { useEffect, useState } from 'react'
import { CheckCircle, AlertCircle, X } from 'lucide-react'
import styles from './Toast.module.css'

export default function Toast({
  message,
  type = 'success',
  duration = 3000,
  onClose,
}) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  if (!isVisible) return null

  const Icon = type === 'success' ? CheckCircle : AlertCircle

  return (
    <div className={`${styles.toast} ${styles[type]} slide-down`}>
      <Icon size={20} className={styles.icon} />
      <span className={styles.message}>{message}</span>
      <button
        className={styles.close}
        onClick={() => {
          setIsVisible(false)
          onClose?.()
        }}
        aria-label="Close toast"
      >
        <X size={18} />
      </button>
    </div>
  )
}
