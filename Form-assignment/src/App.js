import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Home from './Home/Home';
import FormGenerator from './FormGenerator/FormGenerator';

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={FormGenerator}/>
      <Route path="/home" component={Home}/>
    </div>
  );
}

export default App;
