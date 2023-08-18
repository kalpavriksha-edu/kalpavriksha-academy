import React from "react";
import Main from "./Components/Main/Main";
import Navbar from "./Components/Navbar/Navbar";
import Carousel from "./Components/Carousel/Carousel";
import Footer from "./Components/Footer/Footer";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Carousel />
      <Main />
      <Footer />
    </>
  );
};

export default App;
