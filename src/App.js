
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Favorites from './components/Favorites';
import Home from './components/Home';

function App() {

  
   

  return (
    
    <div>
      <Router>
        <Routes>
          
          <Route exact path="/" element={<Home/>} />
            
          
          <Route path="/favorites" element={<Favorites/>} />
          
        </Routes>
      </Router>
    </div>
   );
}


export default App;
