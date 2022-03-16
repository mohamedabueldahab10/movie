import './App.css';
import Navbar from './Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import About from './About/About';
import Movies from './Movies/Movies';
import Network from './Network/Network';
import Login from './Login/Login';
import Register from './Register/Register';

function App() {
  return (
    <div>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='movies' element={<Movies />} />
          <Route path='about' element={<About />} />
          <Route path='network' element={<Network />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='*' element={<h2>404</h2>} />
        </Routes>
      </div>


    </div>
  );
}

export default App;
