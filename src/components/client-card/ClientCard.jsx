import Card from "react-bootstrap/Card";

import avatar from "../Assets/avatar.jpg";

export const ClientCardCard = ({ email, fName, lName, role }) => {
  return (
    <Card style={{ width: "15rem" }} className="clientcard mb-2">
      <Card.Img variant="top" src={avatar} classsName="card-image" />
      <hr />
      <Card.Body>
        <Card.Title className="my-3 ">
          <h4>
            {lName}-{fName}
          </h4>
        </Card.Title>
        <Card.Text>
          <h5>{email}</h5>

          <p>{role}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
