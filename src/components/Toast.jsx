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
    type: 'info', // 'info', 'success', 'error'
  })

  const showToast = useCallback((message, type = 'info', duration = 2500) => {
    setToast({ visible: true, message, type })
    setTimeout(() => {
      setToast({ visible: false, message: '', type: 'info' })
    }, duration)
  }, [])

  const hideToast = useCallback(() => {
    setToast({ visible: false, message: '', type: 'info' })
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastComponent toast={toast} />
    </ToastContext.Provider>
  )
}

// Toast UI Component
const ToastComponent = ({ toast }) => {
  if (!toast.visible) return null

  // Different styles based on type
  const typeStyles = {
    success: 'bg-gold text-obsidian',
    error: 'bg-red-500 text-white',
    info: 'bg-gold text-obsidian',
  }

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
  }

  return (
    <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-[9999] animate-toast-slide-up">
      <div className={`${typeStyles[toast.type]} px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 font-medium text-sm`}>
        <span className="font-bold">{icons[toast.type]}</span>
        <span>{toast.message}</span>
      </div>
    </div>
  )
}

// Standalone Toast Component (if you don't want to use provider)
// This can be used with a ref or global state, but the provider approach is recommended

// For backward compatibility with the original HTML's showToast function,
// you can attach a global instance. But React way is to use the hook.

// Inline styles for animation (if not in global CSS)
const style = document.createElement('style')
style.textContent = `
  @keyframes toastSlideUp {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  .animate-toast-slide-up {
    animation: toastSlideUp 0.3s ease forwards;
  }
`
if (!document.querySelector('#toast-animation-style')) {
  style.id = 'toast-animation-style'
  document.head.appendChild(style)
}

export default ToastProvider