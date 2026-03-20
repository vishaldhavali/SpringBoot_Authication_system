import { useEffect, useRef, useState } from 'react'
import styles from './OtpInput.module.css'

export default function OtpInput({
  length = 6,
  value = '',
  onChange,
  onComplete,
  disabled = false,
  error = false,
}) {
  // SINGLE SOURCE OF TRUTH: EXACTLY 6 boxes
  const [otp, setOtp] = useState(Array(6).fill(''))
  const inputsRef = useRef(Array(6).fill(null))
  const [isShaking, setIsShaking] = useState(false)

  useEffect(() => {
    // Populate array with value digits only (max 6)
    const newOtp = Array(6).fill('')
    const digits = (value || '').split('').slice(0, 6)
    for (let i = 0; i < digits.length; i++) {
      newOtp[i] = digits[i]
    }
    setOtp(newOtp)
  }, [value])

  useEffect(() => {
    if (error) {
      setIsShaking(true)
      const timer = setTimeout(() => setIsShaking(false), 400)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/[^0-9]/g, '')

    if (val.length > 1) {
      // Paste handling
      const pastedOtp = val.slice(0, 6)
      const newOtp = Array(6).fill('')
      for (let i = 0; i < pastedOtp.length; i++) {
        newOtp[i] = pastedOtp[i]
      }
      setOtp(newOtp)
      onChange?.(newOtp.join(''))
      if (newOtp.join('').length === 6) {
        onComplete?.(newOtp.join(''))
      }
      inputsRef.current[Math.min(index + 1, 5)]?.focus()
      return
    }

    const newOtp = [...otp]
    newOtp[index] = val

    setOtp(newOtp)
    const otpValue = newOtp.join('')
    onChange?.(otpValue)

    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus()
    }

    if (otpValue.length === 6) {
      onComplete?.(otpValue)
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputsRef.current[index - 1]?.focus()
        const newOtp = [...otp]
        newOtp[index - 1] = ''
        setOtp(newOtp)
        onChange?.(newOtp.join(''))
      }
    }
  }

  const handleFocus = (e) => {
    e.target.select()
  }

  return (
    <div
      className={`${styles.otpContainer} ${isShaking ? styles.shake : ''} ${
        error ? styles.error : ''
      }`}
    >
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={handleFocus}
          disabled={disabled}
          className={`${styles.otpInput} ${digit ? styles.filled : ''} ${
            error ? styles.inputError : ''
          }`}
          inputMode="numeric"
          autoComplete="one-time-code"
        />
      ))}
    </div>
  )
}
