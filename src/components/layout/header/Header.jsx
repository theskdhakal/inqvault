import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { AiFillLock } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { FiSettings } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";
import logo from "../../Assets/logo.JPG";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config/FirebaseConfig";
import { setUser } from "../../user/UserSlice";
import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import avatar from "../../Assets/avatar.png";

export const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleOnLogout = () => {
    signOut(auth).then(() => {
      dispatch(setUser({}));
    });
  };
  return (
    <Navbar expand="lg" className="navbar ">
      <Container>
        <Navbar.Brand>
          <Link Link to="/">
            <img src={logo} style={{ width: "55px" }} className="rounded" />
          </Link>{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex justify-content-center align-item-center">
            {user?.uid ? (
              <>
                <Link to="/" className="nav-link">
                  Home
                </Link>
                <Link to="/library" className="nav-link">
                  Library
                </Link>
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>

                <Dropdown as={NavItem}>
                  <Dropdown.Toggle as={NavLink}>My Account</Dropdown.Toggle>
                  <Dropdown.Menu className="drop-menu">
                    <h5 className="text-center text-light">
                      {" "}
                      <RxAvatar />
                      {user.fName}
                    </h5>
                    <hr />
                    <Dropdown.Item className="drop-item">
                      <Link to="/profile" className="nav-link">
                        <FiSettings />
                        Setting
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="drop-item">
                      <Link
                        to="/login"
                        className="nav-link"
                        onClick={handleOnLogout}
                      >
                        <FaSignOutAlt className="text-white" />
                        logout
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Link to="/" className="nav-link">
                  Home
                </Link>
                <Link to="/library" className="nav-link">
                  Library
                </Link>

                <Link to="/login" className="nav-link member rounded">
                  <AiFillLock /> Member Login
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
