import { useState } from 'react'

function Signup({ onLogin, onSignup }) {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('')
  const [phone, setPhone] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')


  const handleSubmit = (e) => {

    e.preventDefault()

    setError('')
    setSuccess('')


    // Name validation
    if (!name.trim()) {
      setError('Please enter your full name.')
      return
    }


    // Email validation
    if (!email.trim()) {
      setError('Please enter your email.')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }


    // Password validation
    if (!password) {
      setError('Please create a password.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }


    // Confirm password
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }


    // Role
    if (!role) {
      setError('Please select your role.')
      return
    }


    // Phone
    if (!phone.trim()) {
      setError('Please enter your phone number.')
      return
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setError('Phone number must contain 10 digits.')
      return
    }


    // Create user object
    const newUser = {
      name,
      email,
      password,
      role,
      phone,
    }


    // Send user to App
    const result = onSignup(newUser)


    if (!result.success) {
      setError(result.message)
      return
    }


    // Success
    setSuccess(result.message)


    // Clear form
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setRole('')
    setPhone('')
  }


  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8">


        {/* Branding */}
        <div className="text-center">

          <div className="mx-auto w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              C
            </span>
          </div>

          <h1 className="text-3xl font-bold text-slate-800 mt-4">
            Create Account
          </h1>

          <p className="text-slate-500 mt-2">
            Join the Clinical Trial Management System
          </p>

        </div>


        {/* Signup Form */}
        <form
          className="mt-8 space-y-4"
          onSubmit={handleSubmit}
        >


          {/* Name */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>


          {/* Email */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>


          {/* Password */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-20 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 font-medium"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>

            </div>

          </div>


          {/* Confirm Password */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={
                  showConfirmPassword
                    ? 'text'
                    : 'password'
                }
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full px-4 py-3 pr-20 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 font-medium"
              >
                {showConfirmPassword
                  ? 'Hide'
                  : 'Show'}
              </button>

            </div>

          </div>


          {/* Role */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >

              <option value="">
                Select your role
              </option>

              <option value="investigator">
                Investigator
              </option>

              <option value="ethics">
                Ethics Committee
              </option>

              <option value="safety">
                Pharmacovigilance / Safety
              </option>

              <option value="leadership">
                Institutional Leadership
              </option>

              <option value="admin">
                Administrator / Regulatory
              </option>

            </select>

          </div>


          {/* Phone */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="10-digit phone number"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value.replace(/\D/g, '')
                )
              }
              maxLength="10"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>


          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm">
              {error}
            </div>
          )}


          {/* Success */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 rounded-lg p-3 text-sm">
              {success}
            </div>
          )}


          {/* Create Account */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Create Account
          </button>

        </form>


        {/* Login */}
        <p className="text-center text-sm text-slate-500 mt-6">

          Already have an account?{' '}

          <button
            type="button"
            onClick={onLogin}
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </button>

        </p>

      </div>

    </div>
  )
}

export default Signup