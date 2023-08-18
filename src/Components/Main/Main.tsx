import React, { useEffect } from "react";
import "./main.css";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import img1 from "../../Assets/img1.jpg";
import img2 from "../../Assets/img2.jpg";
import img3 from "../../Assets/img3.jpg";
import img4 from "../../Assets/img4.jpg";
import img5 from "../../Assets/img5.jpg";
import img6 from "../../Assets/img6.jpg";
import Aos from "aos";
import "aos/dist/aos.css";

Aos.init();

interface CourseData {
  id: number;
  imgSrc: string;
  destTitle: string;
  location?: string; // Update if needed
  grade: string;
  fees: string;
  description: string;
}

const Data: CourseData[] = [
  {
    id: 1,
    imgSrc: img1,
    destTitle: "C (Beginner to Advanced)",
    grade: "Creator",
    fees: "$49",
    description:
      "Basic Syntax and Structure, Control Flow (if, else, switch, loops), Functions, Arrays, Pointers, Memory Management, Structures and Unions, File I/O, Preprocessor Directives, Enums, Strings, Memory Allocation and Deallocation, Recursion, Bit Manipulation, Data Structures, Advanced Topics, Standard Library.",
  },

  {
    id: 2,
    imgSrc: img2,
    destTitle: "Data Science",
    grade: "Creator",
    fees: "$49",
    description: "Description of Course.",
  },

  {
    id: 3,
    imgSrc: img3,
    destTitle: "AWS",
    grade: "Creator",
    fees: "$42",
    description: "Description of Course.",
  },

  {
    id: 4,
    imgSrc: img4,
    destTitle: "Web Development",
    grade: "Creator",
    fees: "$33",
    description: "Description of Course.",
  },

  {
    id: 5,
    imgSrc: img5,
    destTitle: "App Development",
    grade: "Creator",
    fees: "$45",
    description: "Description of Course.",
  },

  {
    id: 6,
    imgSrc: img6,
    destTitle: "SalesForce",
    grade: "Creator",
    fees: "$70",
    description: "Description of Course.",
  },
];

const Main: React.FC = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className="main container section">
      <div className="secTitle">
        <h3 data-aos="fade-right" className="title">
          Popular Courses
        </h3>
      </div>

      <div className="secContent grid">
        {Data.map(({ id, imgSrc, destTitle, grade, fees, description }) => {
          return (
            <div key={id} data-aos="fade-up" className="singleDestination">
              <div className="imageDiv">
                <img src={imgSrc} alt={destTitle} />
              </div>

              <div className="cardInfo">
                <h4 className="destTitle">{destTitle}</h4>
                <div className="fees flex">
                  <div className="grade">
                    <span>{grade}</span>
                  </div>
                  <div className="price">
                    <h5>{fees}</h5>
                  </div>
                </div>

                <div className="desc">
                  <p>{description}</p>
                </div>

                <button className="btn flex">
                  ENROLL <HiOutlineClipboardCheck className="icon" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Main;
