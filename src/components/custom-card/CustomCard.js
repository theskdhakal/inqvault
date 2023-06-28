import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Rating } from "../rating/Rating";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

export const CustomCard = ({ name, title, id, year, url, summary }) => {
  const { reviews } = useSelector((state) => state.books);

  const allBook = reviews.filter((item) => item.bookId === id);

  const rate = allBook?.length
    ? allBook.reduce((acc, { ratings }) => acc + +ratings, 0) / allBook.length
    : 5;

  const isMobile = useMediaQuery({ maxWidth: 400 });

  return (
    <Link to={`/books/${id}`} className="nav-link">
      <Card
        style={{ width: isMobile ? "80vw" : "25rem" }}
        className="card mb-2"
      >
        <Card.Img
          variant="top"
          src={url}
          classsName="card-image"
          style={{ height: "500px" }}
        />

        <Card.Body>
          <Card.Title className="my-3 ">
            <h4>{title}</h4>
          </Card.Title>
          <Card.Text>
            <h5>
              {name}-{year}
            </h5>

            <Rating rate={rate} />
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};
