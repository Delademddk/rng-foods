import { BrowserRouter } from 'react-router-dom'
import FloatingCallButton from './components/common/FloatingCallButton'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <FloatingCallButton />
    </BrowserRouter>
  )
}
