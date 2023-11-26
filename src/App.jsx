// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'

// Page
import Home from './pages/(layouts)/HomeScreen'
import About from './pages/(layouts)/AboutScreen'

// layouts
import RootScreen from './pages/(layouts)/MainLayout'
import HelpLayouts from './pages/(layouts)/HelpLayout'
import FAQ from './pages/FAQScreens'
import ContactUs from './pages/ContactUs'
import NotFound from './pages/NotFound404'
import ChatUs from './pages/(layouts)/ChatUs'
import Bootcamp from './pages/(layouts)/Bootcamp'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootScreen />}>
      <Route path='/' element={<Home />}>
        <Route path='chat' element={<ChatUs />} />
        <Route path='bootcamp' element={<Bootcamp />} />
      </Route>
      <Route path='about' element={<About />} />
      <Route path='help' element={<HelpLayouts />}>
        <Route path='faq' element={<FAQ />} />
        <Route path='contact' element={<ContactUs />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)
function App () {
  return <RouterProvider router={router} />
}

export default App
