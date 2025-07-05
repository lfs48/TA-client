import { ErrorBoundary } from 'react-error-boundary'
import './App.css'
import AppRoutes from '@/routes'
import AppFallback from '@/components/UI/errors/app-fallback'

function App() {

  return (
    <ErrorBoundary
      fallbackRender={AppFallback}
    >
      <AppRoutes />
    </ErrorBoundary>

  )
}

export default App
