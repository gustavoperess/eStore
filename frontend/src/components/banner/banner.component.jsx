import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from 'react';
import "./bannerStyle.css"

const myCarouselImages = [
  {
    src: "../../../src/assets/myBanners/Banner_01.png",
    label: "Enjoy 30% off on Winter Products",
    description: "Summer Collection has already arrived."
  },
  {
    src: "../../../src/assets/myBanners/Banner_01.png",
    label: "Summer is almost here, see our collections",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
  },
  {
    src: "../../../src/assets/myBanners/Banner_01.png",
    label: "Shop over 100$ and get an extra 20% off",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
  },
];

function BannerComponent() {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    setPictures(myCarouselImages);
  }, []);

  return (
    <Carousel>
      {pictures.map((picture, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={picture.src}
            alt={picture.label}
          />
          <Carousel.Caption>
            <h5>New Arrivals</h5>
            <h3>{picture.label}</h3>
            <p>{picture.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default BannerComponent;
