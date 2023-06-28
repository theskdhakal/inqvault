import userReducer from "./components/user/UserSlice";
import systemReducer from "./components/system/SystemSlice";
import booksReducer from "./pages/books/BookSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    user: userReducer,
    system: systemReducer,
    books: booksReducer,
  },
});
