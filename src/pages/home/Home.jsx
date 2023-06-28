import React from "react";
import { MainLayout } from "../../components/layout/mainLayout/MainLayout";
import { HomeCarousel } from "../../components/caroussel/HomeCarousel";
import { Col, Container, Row } from "react-bootstrap";
import h1 from "../../components/Assets/h1.png";
import h2 from "../../components/Assets/h2.jpg";
import h3 from "../../components/Assets/h3.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

export const Home = () => {
  const navigate = useNavigate();
  const { book } = useSelector((state) => state.books);

  //create an array of Objects containing the Id and Url of each book
  const recentBookImage = book.slice(-3).map((item) => {
    return {
      id: item.id,
      url: item.url,
    };
  });
  const handleonClick = (id) => {
    navigate(`/books/${id}`);
  };

  const isMobile = useMediaQuery({ maxWidth: 400 });

  return (
    <MainLayout>
      <HomeCarousel />
      <Container className="mt-4">
        <div className="home-cards">
          <Col>
            <Link to="/library" className="nav-link text-dark">
              <div className="f-row">
                <img src={h1} />
              </div>
              <h5> Find your Next Read</h5>
            </Link>
          </Col>

          <Col>
            <Link to="/about" className="nav-link text-dark">
              <div className="f-row">
                <img src={h2} />
              </div>
              <h5> Who We Are</h5>
            </Link>
          </Col>

          <Col>
            <Link to="/register" className="nav-link text-dark">
              <div className="f-row">
                <img src={h3} />
              </div>
              <h5> Join Our Community</h5>
            </Link>
          </Col>
        </div>

        <div className="mt-4 py-5 new-books">
          <h2 className="text-center fw-bold text-decoration-underline">
            {" "}
            Recent Addition
          </h2>

          <div className="image-container">
            {recentBookImage.map((book, index) => (
              <div
                className={`scroll-wrapper ${
                  index === 1 ? "center-image" : ""
                }`}
                key={index}
                onClick={() => {
                  handleonClick(book.id);
                }}
              >
                <img src={book.url} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};
