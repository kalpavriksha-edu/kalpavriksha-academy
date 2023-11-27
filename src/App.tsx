import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import CourseTiles from './components/course_tiles/course_tiles';
import Footer from './components/footer/footer';

function App() {
  return (
    <>
      <Navbar/>
      <CourseTiles/>
      <Footer/>
    </>
  );
}

export default App;
