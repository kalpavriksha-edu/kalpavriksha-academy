import React, { useEffect ,ReactNode} from "react";
import "./footer.css";
import { FiChevronRight, FiSend } from "react-icons/fi";
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillInstagram,
} from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css";
import PropTypes from "prop-types";

interface FooterSectionProps {
  title: string;
  children: ReactNode;
}
// FooterSection component to encapsulate each section of the footer
const FooterSection: React.FC<FooterSectionProps> = ({ title  , children }) => (
  <div className="linkGroup" data-aos="fade-up">
    <span className="groupTitle">{title}</span>
    {children}
  </div>
);

FooterSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const FooterList = ({ text = "Assignments"}) => (
  <li className="footerList flex">
    <FiChevronRight className="icon" />
    {text}
  </li>
);

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
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
            <FooterSection title="CODING">
              <FooterList text="Assignments" />
              <FooterList text="Quizes" />
              <FooterList text="Hackathon" />
              <FooterList text="Competetive Programming" />
              <FooterList text="Practice" />
            </FooterSection>

            <FooterSection title="CERTIFIED IN">
              <FooterList text="Data Structures" />
              <FooterList text="Algorithms" />
              <FooterList text="C#" />
              <FooterList text="Java" />
              <FooterList text="Python" />
            </FooterSection>

            <FooterSection title="COURSES">
              <FooterList text="Android" />
              <FooterList text="AWS" />
              <FooterList text="Blockchain" />
              <FooterList text="Web Development" />
              <FooterList text="Data Science" />
            </FooterSection>
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
