import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRout';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navigation /> */}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="contact-us" element={<ContactUs />} />
          
          {/* Private Routes */}
          <Route element={<PrivateRoute><Outlet /></PrivateRoute>}>
            <Route path="dashboard" element={<Dashboard />} />
            {/* Add more Private routes here */}
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </Router>
  );
}

export default App;
