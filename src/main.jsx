import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { ExtractionReview } from './screens/ExtractionReview/index.jsx'

/* В single-file сборке инлайновый скрипт оказывается в <head> и выполняется
   до разбора body — поэтому монтируемся только когда #root уже есть. */
function mount() {
  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ExtractionReview />
    </React.StrictMode>
  )
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount)
else mount()
