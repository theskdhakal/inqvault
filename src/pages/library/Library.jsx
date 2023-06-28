import React, { useEffect, useState } from "react";
import { MainLayout } from "../../components/layout/mainLayout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { CustomCard } from "../../components/custom-card/CustomCard";
import { getAllBookAction, getAllBookReview } from "../books/BookAction";
import { useMediaQuery } from "react-responsive";

export const Library = () => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState([]);
  const { book } = useSelector((state) => state.books);

  useEffect(() => {
    !display.length && dispatch(getAllBookAction());
    setDisplay(book);
    dispatch(getAllBookReview());
  }, [dispatch, book]);

  const handleOnChange = (e) => {
    const { value } = e.target;

    //filter is used to fikter the book based on typed value
    const filteredItem = book.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setDisplay(filteredItem);
  };

  return (
    <MainLayout>
      <div className="library-main">
        <Container className="pt-4">
          <Row>
            <Col>
              <h1 className="tagline">
                Discover , Engage, and Enrich Your Mind in the Realm of Our
                Library
              </h1>
              <div className=" mt-4">
                <CustomInput
                  placeholder="Search book by title"
                  className="searchBar"
                  onChange={handleOnChange}
                />
                <p className="text-end fs-5">{display.length} Books Found !</p>
              </div>
              <hr />
              <div className="books-card gap-2 ">
                {display.map((item) => (
                  <CustomCard key={item.id} {...item} />
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </MainLayout>
  );
};
