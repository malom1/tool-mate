import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Tools from './components/Tools/Tools'
import Consumables from './components/Consumables/Consumables'
import Vehicles from './components/Vehicles/Vehicles'

function App() {

  return (
    <Router>
      <Header />
      <div className="main-layout">
        <Sidebar/>
        <div className='content'>
          <Routes>
            <Route path='/tools' element= {<Tools />} />
            <Route path='/vehicles' element = {<Vehicles/>} />
            <Route path='/consumables' element = {<Consumables/>} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
