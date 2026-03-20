import { useState, useEffect } from 'react'

export function useOtpTimer(initialSeconds = 60) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) {
      setIsRunning(false)
      return
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, secondsLeft])

  const reset = () => {
    setSecondsLeft(initialSeconds)
    setIsRunning(true)
  }

  return {
    secondsLeft,
    isRunning,
    reset,
    canResend: !isRunning && secondsLeft === 0,
  }
}
