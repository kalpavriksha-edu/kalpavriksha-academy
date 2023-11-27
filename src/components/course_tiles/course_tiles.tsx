import React, { useEffect } from "react";
import "./course_tiles.css";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import Data from "./courseData";

type CourseData = {
  id: number; 
  imgSrc: string;
  Title: string;
  grade: string;
  fees: string;
  description: string;
};

class CourseTiles extends React.Component {
  

  renderCourseTile = ({ id, imgSrc, Title, grade, fees, description } : CourseData) => (
    <div key={id}  className="singleCourseTile">
      <div className="imageDiv">
        <img src={imgSrc} alt={Title} />
      </div>

      <div className="cardInfo">
        <h4 className="destTitle">{Title}</h4>
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

  render() {
    return (
      <section className="main container section">
        <div className="secTitle">
          <h3 data-aos="fade-right" className="title">
            Popular Courses
          </h3>
        </div>

        <div className="secContent grid">
          {Data.map(this.renderCourseTile)}
        </div>
      </section>
    );
  }
}

export default CourseTiles;
