import React from 'react';
import './App.css';
import List from './list.jsx';
import List2 from './list2';

function App() {
  return (
    <div>
      <img src={'https://pbs.twimg.com/profile_images/870526295846694912/2J2AHIBA_400x400.jpg'} width="80px"/>
      <h1 style={{ 
        display: "inline-block", 
        marginLeft:"10px",
        fontSize:"50px",
        fontWeight:"1",
        }}>RMIT Projects</h1>
        
      <List2></List2>
      <List></List>
    </div>
  );
}

export default App;
