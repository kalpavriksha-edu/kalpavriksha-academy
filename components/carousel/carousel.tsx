import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./carousel.css";
//image names are temporary
import caro1 from "../../Assets/caro1.jpg";
import caro2 from "../../Assets/caro2.jpg";
import caro3 from "../../Assets/caro3.jpg";
import caro4 from "../../Assets/caro4.jpg";

interface ImageData {
  src: string;
  alt: string;
}

const imageData: ImageData[] = [
  { src: caro1, alt: "Image 1" },
  { src: caro2, alt: "Image 2" },
  { src: caro3, alt: "Image 3" },
  { src: caro4, alt: "Image 4" },
];

const Carousel: React.FC<{ data?: ImageData[] }> = ({ data = imageData }) => {
  const [slide, setSlide] = useState<number>(0);

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  return (
    <div className="carousel">
      <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
      {data.map((item, idx) => {
        return (
          <img
            src={item.src}
            alt={item.alt}
            key={idx}
            className={slide === idx ? "slide" : "slide slide-hidden"}
          />
        );
      })}
      <BsArrowRightCircleFill
        onClick={nextSlide}
        className="arrow arrow-right"
      />
      <span className="indicators">
        {data.map((_, idx) => {
          return (
            <button
              key={idx}
              className={
                slide === idx ? "indicator" : "indicator indicator-inactive"
              }
              onClick={() => setSlide(idx)}
            ></button>
          );
        })}
      </span>
    </div>
  );
};

export default Carousel;
