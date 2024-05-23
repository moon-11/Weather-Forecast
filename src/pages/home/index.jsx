import '././../../styles/global.css'
import React from 'react';
import Navbar from './components/navbar'; 
import InputSelects from './components/inputSelects';
import Toggle from './components/toggle'; 

function Home() {
  return (
    <div>
      <Navbar /> 
      <InputSelects />
      <Toggle />
    </div>
  );
}

export default Home;
