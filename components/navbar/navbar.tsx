import React, { Component } from "react";
import "./navbar.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import kp1 from "../../Assets/kp1.png";

interface NavbarProps {}

interface NavbarState {
  active: boolean;
}

class Navbar extends Component<NavbarProps, NavbarState> {
  constructor(props: NavbarProps) {
    super(props);

    this.state = {
      active: false,
    };
  }

  toggleNav = () => {
    this.setState((prevState) => ({ active: !prevState.active }));
  };

  renderLogo() {
    return (
      <div className="logoDiv">
        <a href="#" className="logo flex">
          <img src={kp1} alt="KP" />
          <h1 className="icon">Kalpavriksha</h1>
        </a>
      </div>
    );
  }

  renderNavLinks() {
    return (
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
    );
  }

  render() {
    const { active } = this.state;

    return (
      <section className={`navBarSection ${active ? "activeNavbar" : ""}`}>
        <header className="header flex">
          {this.renderLogo()}
          <div className={`navBar ${active ? "activeNavbar" : ""}`}>
            {this.renderNavLinks()}
            <div onClick={this.toggleNav} className="closeNavbar">
              <AiFillCloseCircle className="icon" />
            </div>
          </div>
          <div onClick={this.toggleNav} className="toggleNavbar">
            <TbGridDots className="icon" />
          </div>
        </header>
      </section>
    );
  }
}

export default Navbar;
