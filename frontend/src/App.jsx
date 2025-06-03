import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Items from './pages/Items';
import TestAPI from './pages/TestAPI';
import TestBackend from './pages/TestBackend';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<Items />} />
            <Route path="/test-api" element={<TestAPI />} />
            <Route path="/test-backend" element={<TestBackend />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
