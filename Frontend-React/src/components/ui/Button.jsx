import styles from './Button.module.css'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon: Icon,
  type = 'button',
  onClick,
  className = '',
  ...props
}) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && Icon ? (
        <Icon className={styles.icon + ' spin'} size={20} />
      ) : Icon ? (
        <Icon className={styles.icon} size={20} />
      ) : null}
      {children}
    </button>
  )
}
