import Carousel from "react-bootstrap/Carousel";
import c1 from "../Assets/c1.jpg";
import c2 from "../Assets/c2.jpg";
import c3 from "../Assets/c3.jpg";
import "./Carousel.css";

export const HomeCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={c1} alt="First slide" />
        <Carousel.Caption className="text">
          <h3>Welcome to InqVault</h3>
          <p>Ignite the passion for Learning</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={c2} alt="Second slide" />

        <Carousel.Caption className="text">
          <h3>One in All digital Library</h3>
          <p>Empowering Curiosity and Lifelong Learning</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={c3} alt="Third slide" />

        <Carousel.Caption className="text">
          <h3>Let Books Be Your Guide</h3>
          <p>Books: The Original Virtual Reality... Without the Headset!</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};
