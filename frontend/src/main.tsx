import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from "@react-oauth/google";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId="8803596939-q9fs6huq0j6jhjs6u7rglqah85hmidbq.apps.googleusercontent.com">
          <App />
    </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
