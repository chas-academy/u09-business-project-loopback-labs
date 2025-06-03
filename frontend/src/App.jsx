import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Items from './pages/Items';
import TestAPI from './pages/TestAPI';
import TestBackend from './pages/TestBackend';
import Login from './pages/Login';
import GithubCallback from './pages/GithubCallback';
import Profile from './pages/Profile';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
              />
              <Route
                path="/items"
                element={
                  <PrivateRoute>
                    <Items />
                  </PrivateRoute>
                }
              />
              <Route
                path="/test-api"
                element={
                  <PrivateRoute>
                    <TestAPI />
                  </PrivateRoute>
                }
              />
              <Route
                path="/test-backend"
                element={
                  <PrivateRoute>
                    <TestBackend />
                  </PrivateRoute>
                }
              />
              <Route path="/auth/github/callback" element={<GithubCallback />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
