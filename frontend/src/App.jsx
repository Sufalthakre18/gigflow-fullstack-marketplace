import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import { GigProvider } from './context/GigContext';
import { BidProvider } from './context/BidContext';
import { Navbar } from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import GigDetails from './pages/GigDetails.jsx';
import CreateGig from './pages/CreateGig.jsx';
import Dashboard from './pages/Dashboard.jsx';

function App() {

  return (
    <Router>
      <AuthProvider>
        <GigProvider>
          <BidProvider>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/gigs/:id" element={<GigDetails />} />

                <Route path="/create-gig" element={
                    <PrivateRoute>
                      <CreateGig />
                    </PrivateRoute>
                  }/>
                <Route path="/dashboard" element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }/>
                
              </Routes>
            </div>
            
            
          </BidProvider>
        </GigProvider>
      </AuthProvider>
      
    </Router>
    
  )
}

export default App
