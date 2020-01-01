import React from 'react';
import './App.css';
import Router from './Router.js';

function App() {
  return (
    <div style={{margin:'0'}}>
      <img src={'https://pbs.twimg.com/profile_images/870526295846694912/2J2AHIBA_400x400.jpg'} width="100px"/>
      <h1 style={{ 
        display: "inline-block", 
        marginLeft:"10px",
        fontSize:"50px",
        fontWeight:"1",
        }}>RMIT Projects</h1>
        
        <Router/>
    </div>
  );
}

export default App;
