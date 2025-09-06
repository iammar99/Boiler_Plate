import React, { useState, useEffect } from "react";

const Carousel = ({ images, interval = 2500 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col p-0">
          <div className="simple-carousel">
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="carousel-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;