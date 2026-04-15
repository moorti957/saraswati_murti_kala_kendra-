import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Gem, Palette, Search, Award, Clock, Users, MapPin, Truck } from 'lucide-react'
import workshop_img from "../assets/images/8PM.png";
import target_img from "../assets/images/target.png";
import flw from '../assets/images/flw.png'

const About = () => {
  const navigate = useNavigate()

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const elements = document.querySelectorAll('.anim-fade-up, .anim-fade, .anim-scale')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const craftsmanshipFeatures = [
    { icon: Gem, title: 'Premium Material', desc: 'Only the finest Makrana marble, sourced directly from the quarries of Rajasthan, is used in our creations.' },
    { icon: Palette, title: 'Hand-Painted Details', desc: 'Every ornament and feature is meticulously hand-painted with gold leaf and natural pigments.' },
    { icon: Search, title: 'Quality Assurance', desc: 'Each piece undergoes 7-point quality inspection before it leaves our workshop.' },
  ]

  const stats = [
    { value: '38+', label: 'Years of Experience', icon: Clock },
    { value: '500+', label: 'Statues Delivered', icon: Award },
    { value: '25+', label: 'Master Artisans', icon: Users },
    { value: 'Pan', label: 'India Delivery', icon: Truck },
  ]

  return (
    <section className="pt-24 sm:pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <span className="text-gold text-xs tracking-[0.4em] uppercase font-medium">Our Story</span>
          <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 text-white">
            Saraswati Murti<br />
            <span>
  <span className="text-gold">Kala</span>{" "}
  <span className="bg-clip-text  bg-gradient-to-r from-gold to-gold-light">
    Kendra
  </span>
</span>
          </h1>
          <div className="w-20 h-0.5 bg-gold mx-auto mt-6"></div>
        </div>

        {/* Legacy Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="anim-fade-up">
  <div className="glass rounded-3xl p-10 text-center">
    
<img
  src={workshop_img}
  alt="Workshop"
  className="w-60 h-60 mx-auto mb-6 object-contain transition-transform duration-500 hover:scale-110 drop-shadow-[0_0_30px_rgba(212,175,55,1)]"
/>

    <div className="font-cinzel text-gold text-lg">॥ या कुन्देन्दुतुषारहारधवला ॥</div>
    <div className="font-cormorant text-gray-400 italic mt-2">
      Where stone becomes spirit
    </div>
  </div>
</div>
          <div className="space-y-6 anim-fade-up">
            <h2 className="font-cinzel text-3xl font-bold text-white">A Legacy Carved in Stone</h2>
            <p className="text-gray-400 leading-relaxed">
              Founded in 1985 by Master Sculptor Shri Rameshwar Prasad in the heart of Govindgarh, 
              Saraswati Murti Kala Kendra began as a small workshop with a grand vision — to keep 
              the ancient art of marble sculpting alive while serving the spiritual needs of 
              devotees worldwide.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Today, under the guidance of the third generation, our team of 25+ skilled artisans 
              continues to create masterpieces from premium Makrana marble — the same marble that 
              was used to build the Taj Mahal.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gold" />
                <span className="text-gray-300 text-sm">Govindgarh, Rajasthan</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={16} className="text-gold" />
                <span className="text-gray-300 text-sm">Since 1985</span>
              </div>
            </div>
          </div>
        </div>

        {/* Craftsmanship Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-cinzel text-3xl font-bold text-white">The Art of Craftsmanship</h2>
            <div className="w-20 h-0.5 bg-gold mx-auto mt-6"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {craftsmanshipFeatures.map((feature, idx) => (
              <div key={feature.title} className="glass-card rounded-2xl p-8 anim-fade-up" style={{ transitionDelay: `${idx * 0.1}s` }}>
                <div className="text-4xl mb-4 text-gold">
                  <feature.icon size={32} />
                </div>
                <h3 className="font-cinzel text-gold font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="glass rounded-3xl p-10 sm:p-16 anim-fade-up">
          <h2 className="font-cinzel text-3xl font-bold text-white text-center mb-12">Why Choose Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-3">
                  <stat.icon size={32} className="text-gold" />
                </div>
                <div className="text-gold font-cinzel text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mt-20">
          <div className="glass rounded-2xl p-8 anim-fade-up">
<img
  src={target_img}
  alt="Target"
  className="w-24 h-24 mb-4 object-contain transition-transform duration-500 hover:scale-110 drop-shadow-[0_0_20px_rgba(212,175,55,0.8)]"
/>          <h3 className="font-cinzel text-xl text-gold font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              To preserve and promote India's rich marble sculpting heritage by creating divine 
              masterpieces that inspire devotion and bring spiritual joy to every home and temple.
            </p>
          </div>
          <div className="glass rounded-2xl p-8 anim-fade-up">
            <img
  src={flw}
  alt="Target"
  className="w-24 h-24 mb-4 object-contain transition-transform duration-500 hover:scale-110 drop-shadow-[0_0_20px_rgba(212,175,55,0.8)]"
/>  
            <h3 className="font-cinzel text-xl text-gold font-semibold mb-3">Our Vision</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              To be the world's most trusted name in handcrafted marble statues, where tradition 
              meets excellence, and every creation tells a story of divine artistry.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20 anim-fade-up">
          <button
            onClick={() => navigate('/contact')}
            className="btn-gold px-8 py-4 rounded-xl font-cinzel text-sm tracking-wider"
          >
            Connect With Our Artisans
          </button>
        </div>
      </div>

      {/* Inline styles (add to global CSS if preferred) */}
      <style>{`
        .glass {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(212,175,55,0.15);
        }
        .glass-card {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(212,175,55,0.12);
          transition: all 0.4s ease;
        }
        .glass-card:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(212,175,55,0.35);
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(212,175,55,0.1);
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
        .drop-shadow-gold {
          filter: drop-shadow(0 0 20px rgba(212,175,55,0.3));
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anim-fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .anim-fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  )
}

export default About