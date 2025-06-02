import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="items" element={<div className="page">Items Page</div>} />
          <Route path="profile" element={<div className="page">Profile Page</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
