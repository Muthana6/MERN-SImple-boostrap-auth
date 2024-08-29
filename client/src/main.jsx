import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './custom.scss'
import './index.css'
import {AuthContextProvider} from "../context/authContext.jsx";
import {RecipeContextProvider} from "../context/recipeContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RecipeContextProvider>
          <AuthContextProvider>
              <App />
          </AuthContextProvider>
      </RecipeContextProvider>
  </StrictMode>,
)
