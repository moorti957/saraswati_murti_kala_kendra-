// animations.js - Centralized animation utilities

/**
 * Intersection Observer setup for scroll-triggered animations
 * Adds 'visible' class to elements with animation classes when they come into view
 */

// Animation classes that can be observed
export const animationClasses = ['anim-fade-up', 'anim-fade', 'anim-scale']

/**
 * Initialize Intersection Observer for scroll animations
 * @param {Object} options - Observer options
 * @param {number} options.threshold - Intersection threshold (0-1)
 * @param {string} options.rootMargin - Root margin
 * @returns {IntersectionObserver} Observer instance
 */
export const initScrollAnimations = (options = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }
  
  const observerOptions = { ...defaultOptions, ...options }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        // Optional: unobserve after animation to improve performance
        // observer.unobserve(entry.target)
      }
    })
  }, observerOptions)
  
  // Observe all elements with animation classes
  const observeElements = () => {
    const elements = document.querySelectorAll(animationClasses.join(','))
    elements.forEach(el => observer.observe(el))
  }
  
  // If DOM is already loaded, observe immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeElements)
  } else {
    observeElements()
  }
  
  // Return observer in case caller wants to disconnect later
  return observer
}

/**
 * React hook for scroll-triggered animations
 * Usage: useScrollReveal(ref, options)
 */
import { useEffect, useRef } from 'react'

export const useScrollReveal = (options = {}) => {
  const elementRef = useRef(null)
  
  useEffect(() => {
    const element = elementRef.current
    if (!element) return
    
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    }, { ...defaultOptions, ...options })
    
    observer.observe(element)
    
    return () => {
      if (element) observer.unobserve(element)
    }
  }, [options])
  
  return elementRef
}

/**
 * Staggered animation helper for lists
 * @param {number} index - Item index
 * @param {number} baseDelay - Base delay in seconds (default 0.05)
 * @returns {string} CSS animation delay value
 */
export const getStaggerDelay = (index, baseDelay = 0.05) => {
  return `${index * baseDelay}s`
}

/**
 * Generate animation style object for inline styles
 * @param {number} delay - Delay in seconds
 * @returns {Object} Style object
 */
export const getAnimationStyle = (delay = 0) => ({
  animationDelay: `${delay}s`,
  animationFillMode: 'backwards'
})

// CSS to be injected into document (or can be added to global CSS)
export const animationStyles = `
  /* Fade Up Animation */
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .anim-fade-up {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
                transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .anim-fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Fade In Animation */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .anim-fade {
    opacity: 0;
    transition: opacity 0.6s ease;
  }
  
  .anim-fade.visible {
    opacity: 1;
  }
  
  /* Scale Animation */
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
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
  
  /* Float Animation */
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  
  /* Pulse Gold Animation */
  @keyframes pulseGold {
    0%, 100% { box-shadow: 0 0 20px rgba(212,175,55,0.3); }
    50% { box-shadow: 0 0 40px rgba(212,175,55,0.6); }
  }
  
  .animate-pulse-gold {
    animation: pulseGold 3s infinite;
  }
  
  /* Spin Slow */
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-spin-slow {
    animation: spinSlow 120s linear infinite;
  }
  
  /* Shimmer Effect */
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  .animate-shimmer {
    background: linear-gradient(135deg, 
      transparent 40%, 
      rgba(255,255,255,0.3) 50%, 
      transparent 60%);
    background-size: 200% 100%;
    animation: shimmer 3s infinite;
  }
`

/**
 * Inject animation styles into document head
 */
export const injectAnimationStyles = () => {
  if (typeof document !== 'undefined' && !document.getElementById('animation-styles')) {
    const styleElement = document.createElement('style')
    styleElement.id = 'animation-styles'
    styleElement.textContent = animationStyles
    document.head.appendChild(styleElement)
  }
}

/**
 * Trigger re-animation on elements (useful after dynamic content updates)
 * @param {string} selector - CSS selector for elements to re-animate
 */
export const reanimateElements = (selector = '.anim-fade-up, .anim-fade, .anim-scale') => {
  const elements = document.querySelectorAll(selector)
  elements.forEach(el => {
    el.classList.remove('visible')
    // Force reflow
    void el.offsetHeight
    el.classList.add('visible')
  })
}

/**
 * Predefined transition variants for framer-motion (if using framer-motion)
 * Useful if you want to add Framer Motion later
 */
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
}

export const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.6 }
  }
}

export const scaleVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export default {
  initScrollAnimations,
  useScrollReveal,
  getStaggerDelay,
  getAnimationStyle,
  animationStyles,
  injectAnimationStyles,
  reanimateElements,
  fadeUpVariant,
  fadeInVariant,
  scaleVariant,
  staggerContainer
}