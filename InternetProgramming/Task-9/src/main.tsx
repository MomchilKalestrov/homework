import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Task2 from './Task2'
import Header from './Header';

import image from './assets/react.svg';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <main>
        <h2>Time to get started!</h2>
        <Task2
            name='Jordan'
            surname='Michael'
            image={ image }
            title='Title'
        />
    </main>
  </StrictMode>,
)
