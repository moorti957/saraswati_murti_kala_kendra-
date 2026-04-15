import { createContext, useContext, useState, useCallback } from 'react'

// Toast Context
const ToastContext = createContext(null)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'info',
  })

  let timeoutId = null

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    if (timeoutId) clearTimeout(timeoutId)
    
    setToast({ visible: true, message, type })
    
    timeoutId = setTimeout(() => {
      setToast({ visible: false, message: '', type: 'info' })
      timeoutId = null
    }, duration)
  }, [])

  const hideToast = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    setToast({ visible: false, message: '', type: 'info' })
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast.visible && <ToastComponent toast={toast} onClose={hideToast} />}
    </ToastContext.Provider>
  )
}

// Toast UI Component - Glassmorphism Transparent Style
const ToastComponent = ({ toast, onClose }) => {
  // Glassmorphism styles with different accent borders and text colors
 const typeStyles = {
  success: {
    border: 'border-green-500',
    text: 'text-green-400',
    iconBg: 'bg-green-500/20',
  },
  error: {
    border: 'border-red-500',
    text: 'text-red-400',
    iconBg: 'bg-red-500/20',
  },
  info: {
    border: 'border-yellow-400',
    text: 'text-yellow-300',
    iconBg: 'bg-yellow-400/20',
  },
}

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
  }

  const currentStyle = typeStyles[toast.type]

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[9999] animate-toast-slide-up">
     <div className={`
  bg-gray-900 
  border ${currentStyle.border} 
  text-white
  min-w-[280px] max-w-[90vw] px-5 py-3 rounded-xl 
  shadow-2xl flex items-center gap-3 font-medium text-sm
`}>
        <div className={`w-6 h-6 rounded-full ${currentStyle.iconBg} flex items-center justify-center font-bold text-base ${currentStyle.text}`}>
          {icons[toast.type]}
        </div>
        <span className={`flex-1 ${currentStyle.text}`}>{toast.message}</span>
        <button
          onClick={onClose}
          className={`ml-2 ${currentStyle.text} opacity-70 hover:opacity-100 transition-opacity`}
          aria-label="Close toast"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

// Inject animation styles dynamically
const injectToastStyles = () => {
  if (typeof document !== 'undefined' && !document.querySelector('#toast-custom-styles')) {
    const style = document.createElement('style')
    style.id = 'toast-custom-styles'
    style.textContent = `
      @keyframes toastSlideUp {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }
      .animate-toast-slide-up {
        animation: toastSlideUp 0.3s cubic-bezier(0.21, 1.11, 0.38, 1) forwards;
      }
      .glass-toast {
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }
    `
    document.head.appendChild(style)
  }
}

injectToastStyles()

export default ToastProvider