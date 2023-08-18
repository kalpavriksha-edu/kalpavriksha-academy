import React, { useState } from "react";
import "./navbar.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import kp1 from "../../Assets/kp1.png";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [active, setActive] = useState(false);

  // Function to toggle Navbar
  const toggleNav = () => {
    setActive((prevState) => !prevState);
  };

  return (
    <section className={`navBarSection ${active ? "activeNavbar" : ""}`}>
      <header className="header flex">
        <div className="logoDiv">
          <a href="#" className="logo flex">
            <img src={kp1} alt="KP" />
            <h1 className="icon">Kalpavriksha</h1>
          </a>
        </div>
        <div className={`navBar ${active ? "activeNavbar" : ""}`}>
          <ul className="navLists flex">
            <li className="navItem">
              <a href="#" className="navLink">
                Home
              </a>
            </li>
            <li className="navItem">
              <a href="#" className="navLink">
                Courses
              </a>
            </li>
            <li className="navItem">
              <a href="#" className="navLink">
                Coding
              </a>
            </li>
            <li className="navItem">
              <a href="#" className="navLink">
                Certification
              </a>
            </li>
            <li className="navItem">
              <a href="#" className="navLink">
                Pricing
              </a>
            </li>

            <button className="btn">
              <a href="#">Log-In</a>
            </button>
          </ul>
          <div onClick={toggleNav} className="closeNavbar">
            <AiFillCloseCircle className="icon" />
          </div>
        </div>
        <div onClick={toggleNav} className="toggleNavbar">
          <TbGridDots className="icon" />
        </div>
      </header>
    </section>
  );
};

export default Navbar;
