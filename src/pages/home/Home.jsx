import '././../../styles/global.css'
import React from 'react';
import Navbar from './components/navbar'; 
import Container from './components/container';
import InputSelects from './components/inputSelects';'././components/inputSelects'

function Home() {
  return (
    <div>
      <Navbar /> 
      <Container />
      <InputSelects />
    </div>
  );
}

export default Home;
