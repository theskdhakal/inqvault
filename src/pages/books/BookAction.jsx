import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../components/firebase-config/FirebaseConfig";
import { setBook, setBurrowHistory, setReviews } from "./BookSlice";
import { setModalShow } from "../../components/system/SystemSlice";
import { setClients } from "../../components/user/UserSlice";

//adding book section

export const getAllBookAction = () => async (dispatch) => {
  try {
    //define search  query
    const q = query(collection(db, "books"));
    //run search query
    let books = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      books.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    dispatch(setBook(books));
  } catch (error) {
    toast.error(error.message);
  }
};

export const addNewBookAction = (bookData) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, "books"), {
      ...bookData,
      isAvailable: true,
    });

    console.log(docRef);

    if (docRef?.id) {
      toast.success("New book has been added");
      dispatch(getAllBookAction());

      return;
    }

    toast.error("Error, Unable to add book at the moment");
  } catch (error) {
    toast.error(error.message);
  }
};

// *******************Edit book ******************************
export const updateBookAction =
  ({ id, ...rest }) =>
  async (dispatch) => {
    try {
      await setDoc(doc(db, "books", id), rest, { merge: true });

      toast.success("Book has been updated");
      dispatch(getAllBookAction());
      dispatch(setModalShow(false));
    } catch (error) {
      toast.error(error.message);
    }
  };

export const deleteBookAction = (id) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "books", id));

    toast.success("Book has been deleted");
    dispatch(getAllBookAction());
  } catch (error) {
    toast.error(error.message);
  }
};

// ****************************Burrow-book ************************************

export const createNewBurrowAction = (obj) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, "burrow_history"), obj);

    if (docRef?.id) {
      toast.success("Book has been borrowed");

      //Book is borrowed, so update the books. { isAvailable:false, available from:date}

      const updatedObj = {
        isAvailable: false,
        availableFrom: obj.returnAt,
        id: obj.bookId,
        image: obj.image,
      };

      // now fetch all the book from db and mount to redux
      dispatch(updateBookAction(updatedObj));
      dispatch(getBurrowBookAction(obj.userId));
      return;
    }
    toast.error("Error, Unable to burrow the book");
  } catch (error) {
    toast.error(error.message);
  }
};

export const updateBurrowBookAction =
  ({ id, userId, ...obj }) =>
  async (dispatch) => {
    try {
      console.log(obj);
      await setDoc(doc(db, "burrow_history", id), obj, { merge: true });

      //fetching all the burrow history of the specific user only

      dispatch(getBurrowBookAction(userId));
    } catch (error) {
      toast.error(error.message);
    }
  };

export const getBurrowBookAction = (userId) => async (dispatch) => {
  try {
    const q = query(
      collection(db, "burrow_history"),
      where("userId", "==", userId)
    );

    const docSnap = await getDocs(q);

    let burrowedBooks = [];

    docSnap.forEach((doc) => {
      const id = doc.id;
      const data = doc.data();

      burrowedBooks.push({
        ...data,
        id,
      });
    });
    dispatch(setBurrowHistory(burrowedBooks));
  } catch (error) {
    toast.error(error.message);
  }
};

//return book

export const returnBookAction = (bookId, bhId, userId) => async (dispatch) => {
  try {
    //update burrow_history table

    const updateBhObj = {
      returnAt: Date.now(),
      hasReturned: true,
    };

    await setDoc(doc(db, "burrow_history", bhId), updateBhObj, { merge: true });

    //update book obj
    const updateBookObj = {
      availableFrom: null,
      isAvailable: true,
    };
    await setDoc(doc(db, "books", bookId), updateBookObj, { merge: true });

    toast.success("you have returned the book");
    dispatch(getAllBookAction());
    dispatch(getBurrowBookAction(userId));
  } catch (error) {
    toast.error(error.message);
  }
};

// ****************** Review *******************

export const addNewReviewAction = (reviewObj) => async (dispatch) => {
  try {
    const { bookId, userId, bhId, ratings } = reviewObj;
    const docRef = await addDoc(collection(db, "reviews"), reviewObj);

    if (docRef?.id) {
      toast.success("New Review has been added");

      // updating burrow history table and adding review in there

      const obj = {
        id: bhId,
        userId,
        reviewId: docRef.id,
        ratings,
      };
      dispatch(updateBurrowBookAction(obj));
      dispatch(setModalShow(false));
      return;
    }
  } catch (error) {
    toast.error("Error in adding Review");
  }
};

//fetch the review for selected book when naviageting to book landing of selected book

export const getSelectedBookReview = (bookId) => async (dispatch) => {
  try {
    const q = query(collection(db, "reviews"), where("bookId", "==", bookId));

    const { docs } = await getDocs(q);

    if (docs.length) {
      let indBookReview = [];

      docs.forEach((doc) => {
        const reviewObj = { id: doc.id, ...doc.data() };
        indBookReview.push(reviewObj);
      });
      dispatch(setReviews(indBookReview));
    }
  } catch (error) {
    toast.error(error.message);
  }
};

//fetch the review of all books
export const getAllBookReview = () => async (dispatch) => {
  try {
    //define search query
    const q = query(collection(db, "reviews"));

    //run queries to get data
    let reviews = [];

    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      reviews.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    dispatch(setReviews(reviews));
  } catch (error) {
    toast.error(error.message);
  }
};

//delete selected book review
export const deleteReviewAction =
  ({ reviewId, id, userId }) =>
  async (dispatch) => {
    try {
      await deleteDoc(doc(db, "reviews", reviewId));

      //make reviewId and ratings from burrow history null
      const obj = {
        ratings: null,
        reviewId: null,
      };
      await setDoc(doc(db, "burrow_history", id), obj, { merge: true });

      toast.success("Review has been deleted");
      dispatch(getAllBookReview());
      dispatch(getBurrowBookAction(userId));
    } catch (error) {
      toast.error(error.message);
    }
  };
