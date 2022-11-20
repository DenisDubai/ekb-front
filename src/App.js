import React from 'react';
import { Main } from './components/Main';
import './App.less';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import { Router, Route } from "react-router";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const App = () => (
  <div className="App">
    <Router history={history}>
      <Routes>
      <Route path="/" element={<Main />}/>
      </Routes>
    </Router>
  </div>
);

export default App;