import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight,  Hammer, Sparkles, Truck } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import sai_baba_4 from '../assets/images/4pm.png'
import Krishna_6 from '../assets/images/6pm.png'
import Durga from '../assets/images/5pm.png'
import ram_8 from '../assets/images/8pm.png'
import om from '../assets/images/om1.png'
import fl from '../assets/images/fl.png'
import murti_11 from '../assets/images/11pm.png'
import design from '../assets/images/design.png'
import Sculpt from '../assets/images/Sculpt.png'
import Polish from '../assets/images/Polishpng.png'
import Del from '../assets/images/De.png'
import shiv from '../assets/images/shiv.png'
import logo_saras from '../assets/images/image.png'
import whatsapp_img from "../assets/images/whatsapp.png";



const Home = () => {
  const navigate = useNavigate()
  const [animatedElements, setAnimatedElements] = useState([])
  const heroRef = useRef(null)
  const categoriesRef = useRef(null)
  const featuredRef = useRef(null)
  const processRef = useRef(null)
  const aboutRef = useRef(null)
  const testimonialsRef = useRef(null)
  const ctaRef = useRef(null)

  // Featured products (first 4)
  const featuredProducts = products.filter(p => [1, 2, 4, 6].includes(p.id))

  // Categories data
  const categories = [
    { 
  id: 'sai-baba', 
  name: 'Sai Baba', 
  image: sai_baba_4, 
  count: 12 
},
    { id: 'krishna', name: 'Krishna', image: Krishna_6, count: 15 },
    { id: 'ram', name: 'Ram', image: ram_8, count: 10 },
    { id: 'durga', name: 'Durga', image: Durga, count: 8 },
    { id: 'custom', name: 'Custom', image: murti_11, count: null },
  ]

  // Process steps
  const processSteps = [
    { image: design, title: 'Design', desc: 'Conceptualize your vision with our master artisans' },
    { image: Sculpt, title: 'Sculpt', desc: 'Hand-carved from premium Makrana marble' },
    { image: Polish, title: 'Polish', desc: 'Detailed finishing with gold & paint accents' },
    { image: Del, title: 'Deliver', desc: 'Secure packaging & nationwide delivery' },
  ]

  // Testimonials
  const testimonials = [
    { name: 'Rajesh Sharma', location: 'Mumbai', text: 'The Sai Baba murti we received is absolutely divine. The detail in the face and hands is extraordinary. A true masterpiece.', rating: 5, initial: 'R' },
    { name: 'Priya Patel', location: 'Ahmedabad', text: 'We ordered a custom Krishna statue for our temple. The artisanship exceeded every expectation. Truly blessed.', rating: 5, initial: 'P' },
    { name: 'Anil Gupta', location: 'Delhi', text: 'Professional, timely delivery and the marble quality is unmatched. The Durga murti is the centerpiece of our mandir.', rating: 5, initial: 'A' },
  ]

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

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`)
  }

  const navigateToProducts = () => {
    navigate('/products')
  }

  const navigateToAbout = () => {
    navigate('/about')
  }

  const navigateToContact = () => {
    navigate('/contact')
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative hero-pattern min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background decorative blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-10 bg-gold/30 blur-[80px]"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-5 bg-gold/20 blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="anim-fade-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                  <span className="w-2 h-2 rounded-full bg-gold"></span>
                  <span className="text-gold-light text-xs tracking-widest uppercase">Handcrafted Since 1985</span>
                </div>
                <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">Divine</span>
                  <br />
                  <span className="text-[#D4AF37] drop-shadow-[0_0_6px_rgba(212,175,55,0.6)]">
  Marble
</span>
                  <br />
                  <span className="text-white">Creations</span>
                </h1>
              </div>

              <p className="anim-fade-up text-gray-400 text-lg sm:text-xl font-cormorant italic leading-relaxed max-w-lg">
                Handcrafted with devotion, each marble masterpiece carries the soul of centuries-old Indian artistry.
              </p>

              <div className="anim-fade-up flex flex-wrap gap-4">
                <button onClick={navigateToProducts} className="btn-gold px-8 py-4 rounded-xl font-cinzel text-sm tracking-wider">
                  Explore Collection
                </button>
                <button onClick={navigateToContact} className="btn-outline px-8 py-4 rounded-xl font-cinzel text-sm tracking-wider">
                  Contact Now
                </button>
              </div>

              <div className="anim-fade-up flex gap-8 pt-4">
                <div>
                  <span className="text-gold font-cinzel text-2xl font-bold">500+</span>
                  <br />
                  <span className="text-gray-500 text-xs uppercase tracking-wider">Statues Crafted</span>
                </div>
                <div className="w-px bg-gold/20"></div>
                <div>
                  <span className="text-gold font-cinzel text-2xl font-bold">38+</span>
                  <br />
                  <span className="text-gray-500 text-xs uppercase tracking-wider">Years Legacy</span>
                </div>
                <div className="w-px bg-gold/20"></div>
                <div>
                  <span className="text-gold font-cinzel text-2xl font-bold">100%</span>
                  <br />
                  <span className="text-gray-500 text-xs uppercase tracking-wider">Pure Marble</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="anim-scale relative flex justify-center">
              <div className="relative w-72 h-96 sm:w-80 sm:h-[28rem] rounded-3xl overflow-hidden bg-gradient-to-b from-gold/10 to-obsidian/90 border border-gold/20">
  
  {/* Image */}
  <img
    src={Krishna_6}
    alt="Krishna marble murti handmade Rajasthan"
    className="absolute inset-0 w-full h-full object-contain p-1"
  />

  {/* Overlay Text */}
  <div className="absolute inset-0 flex flex-col justify-end items-center gap-4 pb-6">
  <div className="font-cinzel text-gold text-sm tracking-[0.3em] uppercase">
    Sacred Art
  </div>
</div>

  {/* Bottom Gradient */}
  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian to-transparent"></div>

</div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl glass flex items-center justify-center animate-float">
  <img src={om} alt="om" className="w-12 h-13 object-contain" />
</div>
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-2xl glass flex items-center justify-center animate-float animation-delay-1000">
               <img src={fl} alt="om" className="w-13 h-13 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gold Divider */}
      <div className="gold-line max-w-4xl mx-auto"></div>

      {/* Categories Section */}
      <section className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 anim-fade-up">
            <span className="text-gold text-xs tracking-[0.4em] uppercase font-medium">Our Specialties</span>
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 text-white">Sacred Categories</h2>
            <div className="w-20 h-0.5 bg-gold mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {categories.map((cat, idx) => (
              <div
                key={cat.id}
                className="category-card glass-card rounded-2xl p-6 sm:p-8 text-center anim-fade-up cursor-pointer"
                style={{ transitionDelay: `${idx * 0.1}s` }}
                onClick={() => handleCategoryClick(cat.id)}
              >
              <div className="mb-4 flex justify-center">
  <img
    src={cat.image}
    alt={cat.name}
    className="w-20 h-20 sm:w-24 sm:h-24 object-contain transition-transform duration-300 hover:scale-110"
  />
</div>
                <h3 className="font-cinzel text-gold text-sm font-semibold">{cat.name}</h3>
                {cat.count && <p className="text-gray-500 text-xs mt-2">{cat.count} Designs</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 relative bg-gradient-to-b from-transparent via-gold/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div className="anim-fade-up">
              <span className="text-gold text-xs tracking-[0.4em] uppercase font-medium">Curated Selection</span>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold mt-3 text-white">Featured Masterpieces</h2>
            </div>
            <button
              onClick={navigateToProducts}
              className="btn-outline px-6 py-3 rounded-lg text-sm font-medium anim-fade-up inline-flex items-center gap-2"
            >
              View All <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} delay={idx * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 anim-fade-up">
            <span className="text-gold text-xs tracking-[0.4em] uppercase font-medium">Our Journey</span>
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 text-white">How We Create</h2>
            <div className="w-20 h-0.5 bg-gold mx-auto mt-6"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <div key={step.title} className="text-center anim-fade-up" style={{ transitionDelay: `${idx * 0.1}s` }}>
                <div className="w-20 h-20 mx-auto rounded-2xl glass overflow-hidden mb-6 animate-pulse-gold">
  <img
    src={step.image}
    alt={step.title}
    className="w-full h-full object-cover"
  />
</div>
                <h3 className="font-cinzel text-gold font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 relative bg-gradient-to-b from-transparent via-gold/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
         <div className="anim-fade-up">
  <div className="rounded-3xl overflow-hidden glass p-10 sm:p-14 relative flex flex-col items-center justify-center h-72 sm:h-96">
    
    {/* Image */}
    <img
  src={shiv}
  alt="Temple"
  className="w-56 h-56 sm:w-72 sm:h-72 object-contain 
             drop-shadow-[0_0_35px_rgba(212,175,55,0.9)]
             transition-all duration-500 
             hover:scale-110 
             hover:drop-shadow-[0_0_70px_rgba(212,175,55,1)]"
/>

    {/* Mantra Text */}
    <p className="mt-4 text-gold font-cormorant text-sm sm:text-base text-center tracking-wide">
      || ॐ नमः शिवाय || <br />
      
    </p>

  </div>
</div>

            <div className="space-y-6 anim-fade-up">
              <span className="text-gold text-xs tracking-[0.4em] uppercase font-medium">Our Legacy</span>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white">Three Generations of Sacred Artistry</h2>
              <p className="text-gray-400 leading-relaxed">
                For over three decades, Saraswati Murti Kala Kendra has been the cornerstone of marble craftsmanship in Govindgarh.
                Our artisans carry forward an ancient tradition, transforming raw Makrana marble into divine works of art that
                grace temples, homes, and hearts across India and beyond.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="glass rounded-xl p-4 text-center">
                  <span className="text-gold font-cinzel text-xl font-bold">Premium</span>
                  <br />
                  <span className="text-gray-500 text-xs">Makrana Marble</span>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <span className="text-gold font-cinzel text-xl font-bold">Master</span>
                  <br />
                  <span className="text-gray-500 text-xs">Artisans</span>
                </div>
              </div>
              <button onClick={navigateToAbout} className="btn-outline px-6 py-3 rounded-lg text-sm font-medium mt-4 inline-flex items-center gap-2">
                Read Our Story <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 anim-fade-up">
            <span className="text-gold text-xs tracking-[0.4em] uppercase font-medium">Testimonials</span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold mt-4 text-white">Words of Devotion</h2>
            <div className="w-20 h-0.5 bg-gold mx-auto mt-6"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={t.name} className="testimonial-card glass-card rounded-2xl p-8 anim-fade-up" style={{ transitionDelay: `${idx * 0.1}s` }}>
                <div className="flex gap-1 mb-4 text-gold">{"★".repeat(t.rating)}</div>
                <p className="text-gray-300 font-cormorant text-lg italic leading-relaxed mb-6">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-cinzel font-bold">
                    {t.initial}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-3xl p-12 sm:p-16 anim-scale relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-gold/10 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <div className="mb-6 flex justify-center">
<img
  src={logo_saras}
  alt="Prayer"
  className="w-32 h-32 sm:w-40 sm:h-40 object-contain 
             drop-shadow-[0_0_25px_rgba(212,175,55,0.8)]
             transition duration-500 hover:scale-110"
/>
</div>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-4">Begin Your Sacred Journey</h2>
              <p className="text-gray-400 font-cormorant text-lg italic max-w-lg mx-auto mb-8">
                Commission a divine marble creation that will be cherished for generations
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={navigateToContact} className="btn-gold px-8 py-4 rounded-xl font-cinzel text-sm tracking-wider">
                  Get Custom Quote
                </button>
                <a
                  href="https://wa.me/919672232736"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline px-8 py-4 rounded-xl text-sm font-medium inline-flex items-center gap-2"
                >
                  <img
  src={whatsapp_img}
  alt="WhatsApp"
  className="w-6 h-6"
/> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inline styles for animations and custom effects */}
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
        .btn-outline {
          border: 1px solid rgba(212,175,55,0.5);
          color: #D4AF37;
          transition: all 0.3s ease;
        }
        .btn-outline:hover {
          background: rgba(212,175,55,0.1);
          border-color: #D4AF37;
          box-shadow: 0 0 20px rgba(212,175,55,0.2);
        }
        .gold-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, #D4AF37, transparent);
        }
        .hero-pattern {
          background-image: radial-gradient(circle at 20% 50%, rgba(212,175,55,0.08) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(212,175,55,0.05) 0%, transparent 50%),
                            radial-gradient(circle at 50% 80%, rgba(212,175,55,0.04) 0%, transparent 50%);
        }
        .filter-drop-shadow-gold {
          filter: drop-shadow(0 0 20px rgba(212,175,55,0.3));
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        @keyframes pulse-gold {
          0%,100% { box-shadow: 0 0 20px rgba(212,175,55,0.3); }
          50% { box-shadow: 0 0 40px rgba(212,175,55,0.6); }
        }
        .animate-pulse-gold {
          animation: pulse-gold 3s infinite;
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
        .anim-scale {
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .anim-scale.visible {
          opacity: 1;
          transform: scale(1);
        }
        .testimonial-card {
          position: relative;
        }
        .testimonial-card::before {
          content: '"';
          position: absolute;
          top: -10px;
          left: 16px;
          font-size: 80px;
          font-family: 'Cinzel', serif;
          color: rgba(212,175,55,0.15);
          line-height: 1;
        }
        .bg-gradient-radial {
          background-image: radial-gradient(circle at center, var(--tw-gradient-from), var(--tw-gradient-to));
        }
      `}</style>
    </>
  )
}

export default Home