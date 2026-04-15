import { useState } from 'react'
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react'
import { useToast } from '../components/Toast'
import whatsapp_img from "../assets/images/whatsapp.png";

const Contact = () => {
  const { showToast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    showToast('Message sent successfully! We\'ll get back to you within 24 hours.', 'success')
    
    // Reset form after 3 seconds (optional)
    setTimeout(() => {
      setFormData({ name: '', phone: '', email: '', message: '' })
      setIsSubmitted(false)
    }, 3000)
  }

  const contactInfo = [
    { icon: MapPin, title: 'Visit Our Workshop', content: 'Saraswati Murti Kala Kendra, Ramwas, govindgarh, Rajasthan 301604 India', link: null },
    { icon: Phone, title: 'Call Us', content: '+91 9672232736', link: 'tel:+919672232736', subtext: 'Mon-Sat, 9AM - 7PM IST' },
    { icon: Mail, title: 'Email', content: 'info@saraswatimurti.com', link: 'mailto:info@saraswatimurti.com' },
  ]

  return (
    <section className="pt-24 sm:pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-xs tracking-[0.4em] uppercase font-medium">Get In Touch</span>
          <h1 className="font-cinzel text-4xl sm:text-5xl font-bold mt-4 text-white">Contact Us</h1>
          <div className="w-20 h-0.5 bg-gold mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass rounded-3xl p-8 sm:p-10">
            <h3 className="font-cinzel text-xl text-gold font-semibold mb-6">Send Us a Message</h3>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="text-gray-400 text-sm mb-1 block">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-white/5 border border-gold/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 text-sm focus:border-gold/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="text-gray-400 text-sm mb-1 block">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-white/5 border border-gold/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 text-sm focus:border-gold/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-gray-400 text-sm mb-1 block">Email (Optional)</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-white/5 border border-gold/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 text-sm focus:border-gold/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-gray-400 text-sm mb-1 block">Your Message *</label>
                  <textarea
                    id="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about the statue you're looking for..."
                    className="w-full bg-white/5 border border-gold/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 text-sm resize-none focus:border-gold/50 focus:outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full py-4 rounded-xl font-cinzel text-sm tracking-wider disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>Sending... <Send size={16} className="animate-pulse" /></>
                  ) : (
                    <>Send Message <Send size={16} /></>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="text-5xl mb-4 flex justify-center">
                  <CheckCircle size={48} className="text-gold" />
                </div>
                <h3 className="font-cinzel text-gold text-xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-gray-400 text-sm">We'll get back to you within 24 hours.</p>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, idx) => (
              <div key={info.title} className="glass rounded-2xl p-6 flex items-start gap-4 hover:border-gold/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <info.icon className="text-gold" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">{info.title}</h4>
                  {info.link ? (
                    <a href={info.link} className="text-gray-400 text-sm hover:text-gold transition-colors">
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-gray-400 text-sm">{info.content}</p>
                  )}
                  {info.subtext && <p className="text-gray-500 text-xs mt-1">{info.subtext}</p>}
                </div>
              </div>
            ))}

            {/* WhatsApp Card */}
            <div className="glass rounded-2xl p-6 flex items-start gap-4 hover:border-gold/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <img
  src={whatsapp_img}
  alt="WhatsApp"
  className="w-6 h-6"
/>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">WhatsApp</h4>
                <a
                  href="https://wa.me/919672232736"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 text-sm hover:underline"
                >
                  Chat with us on WhatsApp
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="glass rounded-2xl overflow-hidden h-64 bg-gradient-to-br from-gold/5 to-obsidian-mid/80 flex flex-col items-center justify-center text-center p-6">
              <MapPin size={32} className="text-gold mb-3" />
              <p className="text-gray-400 text-sm">Govind Garh, Rajasthan, India</p>
              <a
                href="https://maps.app.goo.gl/KGe4npSxhLgJvtmt8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold text-sm mt-2 hover:underline"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Inline styles (add to global CSS if preferred) */}
      <style>{`
        .glass {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(212,175,55,0.15);
          transition: all 0.3s ease;
        }
        .glass:hover {
          border-color: rgba(212,175,55,0.3);
        }
        .btn-gold {
          background: linear-gradient(135deg, #D4AF37, #B8960C);
          color: #0B0B0B;
          font-weight: 700;
          transition: all 0.3s ease;
        }
        .btn-gold:hover {
          box-shadow: 0 0 30px rgba(212,175,55,0.5);
          transform: translateY(-2px);
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 1s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

export default Contact