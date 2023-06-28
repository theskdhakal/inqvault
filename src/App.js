import { ToastContainer } from "react-toastify";
import "./App.css";
import { Header } from "./components/layout/header/Header";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Footer } from "./components/layout/footer/Footer";
import { MainLayout } from "./components/layout/mainLayout/MainLayout";
import { Register } from "./pages/login-register/Register";
import { Login } from "./pages/login-register/Login";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Profile } from "./pages/profile/Profile";
import { PrivateRoute } from "./components/private-route/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { getUserAction } from "./components/user/UserAction";
import { auth } from "./components/firebase-config/FirebaseConfig";
import { History } from "./pages/history/History";
import { Books } from "./pages/books/Books";
import { Clients } from "./pages/clients/Clients";
import { Reviews } from "./pages/reviews/Reviews";
import { NewBook } from "./pages/books/NewBook";
import { useEffect } from "react";
import { getAllBookAction } from "./pages/books/BookAction";
import { BookLanding } from "./pages/books/BookLanding";
import { Library } from "./pages/library/Library";
import { User } from "./pages/user/User";
import { Toaster } from "react-hot-toast";
import { Message } from "./pages/message/Message";
import { AboutUs } from "./pages/about/AboutUs";

function App() {
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (userData) => {
    if (userData?.uid) {
      dispatch(getUserAction(userData.uid));
    }
  });

  const { book } = useSelector((state) => state.books);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/messages"
          element={
            <PrivateRoute>
              <Message />
            </PrivateRoute>
          }
        />
        <Route
          path="/books"
          element={
            <PrivateRoute>
              <Books />
            </PrivateRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <PrivateRoute>
              <Clients />
            </PrivateRoute>
          }
        />

        <Route
          path="/reviews"
          element={
            <PrivateRoute>
              <Reviews />
            </PrivateRoute>
          }
        />
        <Route
          path="/newbook"
          element={
            <PrivateRoute>
              <NewBook />
            </PrivateRoute>
          }
        />
        <Route
          path="/books/:bookId"
          element={
            <PrivateRoute>
              <BookLanding />
            </PrivateRoute>
          }
        />
      </Routes>
      <Toaster />
      <ToastContainer />
    </div>
  );
}

export default App;
