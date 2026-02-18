import { useState, useCallback } from 'react'

/**
 * useForm — Generic form state manager
 *
 * @param {Object} initialValues  - Initial field values
 * @param {Function} validateFn   - (values) => errors object
 * @param {Function} onSubmit     - async (values) => void
 */
export function useForm(initialValues, validateFn, onSubmit) {
  const [values, setValues]   = useState(initialValues)
  const [errors, setErrors]   = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus]   = useState('idle') // idle | loading | success | error
  const [serverMessage, setServerMessage] = useState('')

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))

    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }, [errors])

  const handleBlur = useCallback((e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))

    // Validate on blur if validator provided
    if (validateFn) {
      const fieldErrors = validateFn({ ...values, [name]: values[name] })
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || '' }))
    }
  }, [values, validateFn])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()

    // Mark all fields touched
    const allTouched = Object.keys(values).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    setTouched(allTouched)

    // Run full validation
    const fieldErrors = validateFn ? validateFn(values) : {}
    setErrors(fieldErrors)

    if (Object.values(fieldErrors).some(Boolean)) return

    setStatus('loading')
    setServerMessage('')

    try {
      const message = await onSubmit(values)
      setStatus('success')
      setServerMessage(message || 'Success!')
      setValues(initialValues)
      setTouched({})
    } catch (err) {
      setStatus('error')
      setServerMessage(err.message || 'Something went wrong. Please try again.')
    }
  }, [values, validateFn, onSubmit, initialValues])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setStatus('idle')
    setServerMessage('')
  }, [initialValues])

  return {
    values,
    errors,
    touched,
    status,
    serverMessage,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  }
}
