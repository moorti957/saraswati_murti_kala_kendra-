import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from '../assets/images/images-Photoroom.png'
const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  const categories = [
    { name: 'Sai Baba Murti', filter: 'sai-baba' },
    { name: 'Krishna Murti', filter: 'krishna' },
    { name: 'Ram Darbar', filter: 'ram' },
    { name: 'Durga Murti', filter: 'durga' },
    { name: 'Custom Orders', filter: 'custom' },
  ]

  const handleCategoryClick = (filter) => {
    // Navigate to products page with filter
    window.location.href = `/products?category=${filter}`
  }

  return (
    <footer className="border-t border-gold/10 bg-gradient-to-b from-obsidian to-obsidian-light/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-gold to-gold-dark">
                 <img 
                 src={logo} 
                 alt="logo"
                 className="w-6 h-6 object-contain"
               />
              </div>
              <div>
                <div className="font-cinzel text-gold text-sm font-bold">
                  Saraswati Murti
                </div>
                <div className="text-[10px] text-gold-light tracking-[0.2em] uppercase opacity-70">
                  Kala Kendra
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Handcrafted marble statues with devotion since 1985. Each creation is a testament to India's rich sculptural heritage.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cinzel text-gold text-sm font-semibold mb-6 tracking-wider">
              Quick Links
            </h4>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-400 text-sm hover:text-gold transition-colors block"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-cinzel text-gold text-sm font-semibold mb-6 tracking-wider">
              Categories
            </h4>
            <div className="space-y-3">
              {categories.map((cat) => (
                <button
                  key={cat.filter}
                  onClick={() => handleCategoryClick(cat.filter)}
                  className="text-gray-400 text-sm hover:text-gold transition-colors block cursor-pointer"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-cinzel text-gold text-sm font-semibold mb-6 tracking-wider">
              Contact Info
            </h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-gold mt-0.5 flex-shrink-0" />
                <span>Ward No. 11, Ramgarh Road, Near Nitu Kabadi Ki Mill, Ramwas, Govindgarh, Alwar, Rajasthan-301604</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-gold flex-shrink-0" />
                <span>+91 9672232736</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-gold flex-shrink-0" />
                <span>info@saraswatimurti.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/40 transition-all"
                aria-label="Facebook"
              >
               <FaFacebook size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/40 transition-all"
                aria-label="Instagram"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/40 transition-all"
                aria-label="YouTube"
              >
                <FaYoutube size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="gold-line my-12"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>© {currentYear} Saraswati Murti Kala Kendra. All rights reserved.</p>
          <p className="font-cormorant italic text-gold/40">
            || ॐ श्री सरस्वत्यै नमः ||
          </p>
        </div>
      </div>

      {/* Inline style for glass effect (if not already in global CSS) */}
      <style>{`
        .glass {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(212,175,55,0.15);
        }
        .gold-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, #D4AF37, transparent);
        }
      `}</style>
    </footer>
  )
}

export default Footer