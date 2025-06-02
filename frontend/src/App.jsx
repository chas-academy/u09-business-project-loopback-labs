import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Items from './pages/Items';
import TestAPI from './pages/TestAPI';
import TestBackend from './pages/TestBackend';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="items" element={<Items />} />
          <Route path="profile" element={<div className="page">Profile Page</div>} />
          <Route path="test" element={<TestAPI />} />
          <Route path="test-backend" element={<TestBackend />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
