import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteBookAction, getAllBookAction } from "./BookAction";
import { setModalShow } from "../../components/system/SystemSlice";
import { CustomModal } from "../../components/custom-modal/CustomModal";
import { EditBook } from "../../components/edit-book/EditBook";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export const BookTable = () => {
  const { book } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    !book.length && dispatch(getAllBookAction());
  }, []);

  const [selectedBook, setSelectedBook] = useState({});

  const handleOnEdit = (obj) => {
    setSelectedBook(obj);
    dispatch(setModalShow(true));
  };

  const handleOnDelete = (item) => {
    setSelectedBook(item);
    if (window.confirm("Deleted book cant'r be restored !")) {
      dispatch(deleteBookAction(item.id));
    }
  };

  const isMobile = useMediaQuery({ maxWidth: 450 });

  console.log(selectedBook);
  return (
    <div>
      <CustomModal heading="Edit book">
        <EditBook selectedBook={selectedBook} />
      </CustomModal>
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            {!isMobile && <th>Author Name</th>}
            {!isMobile && <th>Published year</th>}

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {book.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.url} alt=" " style={{ width: "50px" }} />
              </td>
              <td>{item.title}</td>
              {!isMobile && <td>{item.name}</td>}
              {!isMobile && <td>{item.year}</td>}

              <td>
                <Button
                  variant="warning"
                  className="mx-1"
                  onClick={() => handleOnEdit(item)}
                >
                  <AiFillEdit />
                </Button>

                <Button
                  variant="danger"
                  type="submit"
                  onClick={() => {
                    handleOnDelete(item);
                  }}
                >
                  <AiFillDelete />{" "}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
