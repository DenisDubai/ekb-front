import React from 'react';
import { Main } from './components/Main';
import Navbar from './components/Navbar';
import './App.less';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages';
import About from './pages/about';

const App = () => (
  <div className="App">
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' exact element ={Home} />
        <Route path='/about' element ={About} />
      </Routes>
    </Router>
    <Main />
  </div>
);

export default App;