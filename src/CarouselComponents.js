import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const carouselItems = [
  {
    id: 1,
    image: "carousel1.jpg",
    title: "Special Offer 1",
    description: "Enjoy our new summer menu!",
    link: "https://example.com/offer1"
  },
  {
    id: 2,
    image: "carousel2.jpg",
    title: "Special Offer 2",
    description: "Try our chef's recommendation!",
    link: "https://example.com/offer2"
  },
  {
    id: 3,
    image: "carousel3.jpg",
    title: "Special Offer 3",
    description: "Limited time dessert menu!",
    link: "https://example.com/offer3"
  },
];

const CarouselComponent = () => (
  <Carousel
    showArrows={true}
    infiniteLoop={true}
    showThumbs={false}
    showStatus={false}
    autoPlay={true}
    interval={6000}
  >
    {carouselItems.map((item) => (
      <div key={item.id}>
        <img src={item.image} alt={item.title} />
        <div className="legend">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <a href={item.link} target="_blank" rel="noopener noreferrer">Learn More</a>
        </div>
      </div>
    ))}
  </Carousel>
);

export default CarouselComponent;