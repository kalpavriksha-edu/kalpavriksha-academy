import React, { useEffect } from "react";
import "./footer.css";
import { FiChevronRight, FiSend } from "react-icons/fi";
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillInstagram,
} from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <section className="footer">
      <div className="secContent container">
        <div className="contactDiv flex">
          <div data-aos="fade-up" className="text">
            <small>ANY ISSUE</small>
            <h2>Share with us</h2>
          </div>

          <div className="inputDiv flex">
            <input
              data-aos="fade-up"
              type="text"
              placeholder="Enter Email Address"
            />
            <button data-aos="fade-up" className="btn flex" type="submit">
              SEND <FiSend className="icon" />
            </button>
          </div>
        </div>

        <div className="footerCard flex">
          <div className="footerIntro flex">
            <div className="logoDiv">
              <a href="#" className="logo flex">
                Kalpavriksha
              </a>
            </div>

            <div data-aos="fade-up" className="footerParagraph">
              Welcome to our organization dedicated to fostering continuous
              learning and advancement in the realm of coding. We are a dynamic
              platform that champions a culture of perpetual growth, offering a
              diverse range of courses tailored for coding enthusiasts of all
              levels. Our comprehensive curriculum, crafted by industry experts,
              empowers individuals to embark on a journey of skill enhancement
              and proficiency.
            </div>

            <div data-aos="fade-up" className="footerSocials">
              <AiOutlineTwitter className="icon" />
              <AiFillYoutube className="icon" />
              <AiFillInstagram className="icon" />
            </div>
          </div>

          <div className="footerLinks grid">
            <div
              data-aos="fade-up"
              data-aos-duration="3000"
              className="linkGroup"
            >
              <span className="groupTitle">CODING</span>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Assignments
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Quizes
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Hackathon
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Competetive Programming
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Practice
              </li>
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="4000"
              className="linkGroup"
            >
              <span className="groupTitle">CERTIFIED IN</span>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Data Structures
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Algorithms
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                C#
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Java
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Python
              </li>
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="5000"
              className="linkGroup"
            >
              <span className="groupTitle">COURSES</span>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Android
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                AWS
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Blockchain
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Web Development
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Data Science
              </li>
            </div>
          </div>

          <div className="footerDiv flex">
            <small>KALPAVRIKSHA</small>
            <small>COPYRIGHTS RESERVED</small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
