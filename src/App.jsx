import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Tools from './pages/Tools/Tools'
import Consumables from './pages/Consumables/Consumables'
import Vehicles from './pages/Vehicles/Vehicles'
import Dashboard from './pages/Dashboard/Dashboard'
import Auth from './pages/Auth/Auth'
import Footer from './components/Footer/Footer'

function App() {

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: {session}}) => {
      setSession(session)
    });

    const { data: {subscription} } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    });

    return () => subscription.unsubscribe();
  }, []);

  if(!session) {
    return <Auth />
  }

  return (
    <Router>
      <Header />
      <div className="main-layout">
        <Sidebar/>
        <div className='content'>
          <Routes>
            <Route path='/' element = {<Dashboard />} />
            <Route path='/tools' element = {<Tools />} />
            <Route path='/vehicles' element = {<Vehicles/>} />
            <Route path='/consumables' element = {<Consumables/>} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  )
}

export default App
