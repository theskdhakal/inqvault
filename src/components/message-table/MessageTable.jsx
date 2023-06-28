import { Button, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessageAction } from "../user/UserAction";

export const MessageTable = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.user);

  const handleOnDelete = (item) => {
    if (window.confirm("delete this message")) {
      dispatch(deleteMessageAction(item.id));
    }
  };

  return (
    <Container className="my-5 p-3 shadow-lg">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Message</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {message.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.email}</td>

              <td> {item.message}</td>

              <td>
                <Button variant="danger" onClick={() => handleOnDelete(item)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
