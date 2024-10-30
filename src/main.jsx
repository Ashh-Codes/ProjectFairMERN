import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ConextShare from './context/ConextShare.jsx'
import AuthContext from './context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthContext>
   <ConextShare>
    <BrowserRouter>
    <App />
    </BrowserRouter> 
    </ConextShare>
   </AuthContext>
     </StrictMode>
)
