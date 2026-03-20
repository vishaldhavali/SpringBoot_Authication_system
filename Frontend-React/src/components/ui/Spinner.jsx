import { Loader2 } from 'lucide-react'
import styles from './Spinner.module.css'

export default function Spinner({ size = 40, color = 'var(--color-primary)' }) {
  return (
    <div className={styles.spinner}>
      <Loader2 size={size} color={color} className={styles.icon} />
    </div>
  )
}
