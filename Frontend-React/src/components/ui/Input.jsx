import { useState } from 'react'
import styles from './Input.module.css'

export default function Input({
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  onFocus,
  onBlur,
  error = false,
  errorMessage = '',
  icon: Icon,
  disabled = false,
  className = '',
  inputRef,
  autoFocus = false,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleFocus = (e) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e) => {
    setIsFocused(false)
    onBlur?.(e)
  }

  const inputType = type === 'password' && showPassword ? 'text' : type

  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      {Icon && <Icon className={styles.icon} size={20} />}
      <input
        ref={inputRef}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        autoFocus={autoFocus}
        className={`${styles.input} ${error ? styles.error : ''} ${
          isFocused ? styles.focused : ''
        }`}
        {...props}
      />
      {type === 'password' && (
        <button
          type="button"
          className={styles.togglePassword}
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          {showPassword ? '🙈' : '👁️'}
        </button>
      )}
      {error && errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  )
}
