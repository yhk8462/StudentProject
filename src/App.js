import React from 'react';
import './App.css';
import Router from './Router.js';

function App() {
  return (
    <div>
      <img src={'https://pbs.twimg.com/profile_images/870526295846694912/2J2AHIBA_400x400.jpg'} width="80px"/>
      <h1 style={{ 
        display: "inline-block", 
        marginLeft:"10px",
        fontSize:"50px",
        fontWeight:"1",
        }}>RMIT Project</h1>
        
        <Router/>
    </div>
  );
}

export default App;
