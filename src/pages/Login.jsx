import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import logo_saras from '../assets/images/image.png'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      await login(formData.email, formData.password)
      navigate('/account')
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="pt-24 sm:pt-28 pb-20 min-h-screen flex items-center">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="mb-4 flex justify-center">
  <img
    src={logo_saras}
    alt="logo"
    className="w-32 h-32 object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]"
  />
</div>
            <h1 className="font-cinzel text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-gray-400 text-sm mt-2">Sign in to your account</p>
            <div className="w-20 h-0.5 bg-gold mx-auto mt-4"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="text-gray-400 text-sm mb-1 block">Email Address *</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-gold/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-gray-600 text-sm focus:border-gold/50 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-gray-400 text-sm mb-1 block">Password *</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-gold/20 rounded-xl pl-10 pr-10 py-3 text-white placeholder:text-gray-600 text-sm focus:border-gold/50 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gold"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-500/10 rounded-lg p-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-gold w-full py-3 rounded-xl font-cinzel text-sm tracking-wider disabled:opacity-70"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-gold hover:underline">
                Create Account
              </Link>
            </p>
          </div>

          <div className="gold-line my-6"></div>

          <div className="text-center">
            <p className="text-gray-500 text-xs">Demo: demo@example.com / demo123</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login