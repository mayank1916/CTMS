import { useState } from 'react'

function Login({ onSignup, onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    setError('')
    setSuccess('')

    // Empty email
    if (!email.trim()) {
      setError('Please enter your email.')
      return
    }

    // Email validation
    if (!email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    // Empty password
    if (!password) {
      setError('Please enter your password.')
      return
    }

    // Password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    // Get registered users
    const users =
      JSON.parse(localStorage.getItem('users')) || []

    // Find matching user
    const user = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    )

    // Invalid login
    if (!user) {
      setError('Invalid email or password.')
      return
    }

    // Login successful
    setSuccess('Login successful!')

    onLogin(user)
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        {/* Branding */}
        <div className="text-center">

          <div className="mx-auto w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              C
            </span>
          </div>

          <h1 className="text-3xl font-bold text-slate-800 mt-4">
            CTMS
          </h1>

          <p className="text-slate-500 mt-2">
            Clinical Trial Management System
          </p>

        </div>


        {/* Welcome */}
        <div className="mt-8">

          <h2 className="text-xl font-semibold text-slate-800">
            Welcome Back
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Sign in to continue to your dashboard
          </p>

        </div>


        {/* Login Form */}
        <form
          className="mt-6 space-y-5"
          onSubmit={handleSubmit}
        >

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
                placeholder="Enter your password"
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


          {/* Sign In */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign In
          </button>

        </form>


        {/* Signup */}
        <p className="text-center text-sm text-slate-500 mt-6">

          New here?{' '}

          <button
            type="button"
            onClick={onSignup}
            className="text-blue-600 font-semibold hover:underline"
          >
            Create an account
          </button>

        </p>

      </div>

    </div>
  )
}

export default Login