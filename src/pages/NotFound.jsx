import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="pt-32 pb-20 min-h-screen flex items-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="text-8xl mb-6">🔱</div>
        <h1 className="font-cinzel text-4xl font-bold text-white mb-4">404</h1>
        <p className="text-gray-400 mb-6">Oops! The page you're looking for cannot be found.</p>
        <Link to="/" className="btn-gold px-6 py-3 rounded-xl font-cinzel text-sm inline-block">
          Return Home
        </Link>
      </div>
    </section>
  )
}

export default NotFound