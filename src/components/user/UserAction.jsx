import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import {
  setDoc,
  doc,
  getDoc,
  query,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase-config/FirebaseConfig";
import { setClients, setMessage, setUser } from "./UserSlice";
import { setModalShow } from "../system/SystemSlice";

export const registerUserAction = async ({
  confirmPassword,
  password,
  ...rest
}) => {
  try {
    const pendingUser = createUserWithEmailAndPassword(
      auth,
      rest.email,
      password
    );

    toast.promise(pendingUser, {
      pending: "please wait...",
    });

    const { user } = await pendingUser;

    if (user?.uid) {
      await setDoc(doc(db, "users", user.uid), rest);
      return toast.success("Your account has been registered!");
    }
    toast.error("something went wrong");
  } catch (error) {
    toast.error(error.message);
  }
};

export const getUserAction = (uid) => async (dispatch) => {
  try {
    //read user id from firebase

    const docSnap = await getDoc(doc(db, "users", uid));

    if (docSnap.exists()) {
      const user = { ...docSnap.data(), uid };
      dispatch(setUser(user));
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const loginUser = (form) => async (dispatch) => {
  try {
    const pendingUser = signInWithEmailAndPassword(
      auth,
      form.email,
      form.password
    );

    toast.promise(pendingUser, {
      pending: "please wait....",
    });

    const { user } = await pendingUser;
    if (user?.uid) {
      dispatch(getUserAction(user.uid));
    }
  } catch (error) {
    toast.error(error.message);
  }
};

//update profile
export const updateProfileACtion =
  ({ id, ...rest }) =>
  async (dispatch) => {
    try {
      await setDoc(doc(db, "users", id), rest, { merge: true });
      toast.success("Your profile has been updated");
      dispatch(getUserAction(id));
    } catch (error) {
      toast.error("Failed to update your profile.please contact system admin");
    }
  };

export const getAllClientAction = () => async (dispatch) => {
  try {
    //define search queery
    const q = query(collection(db, "users"));

    //run query
    let clients = [];

    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      clients.push({ ...doc.data(), id: doc.id });
    });

    dispatch(setClients(clients));
  } catch (error) {
    toast.error(error);
  }
};

// add new message ACtion
export const addNewMessageAction = (messageObj) => async (dispatch) => {
  try {
    const { message, email } = messageObj;
    const docRef = await addDoc(collection(db, "message"), messageObj);

    if (docRef?.id) {
      toast.success("Your Message has been Sent");

      dispatch(getAllMessageAction());
      dispatch(setModalShow(false));
      return;
    }
  } catch (error) {
    toast.error("Error in adding Review");
  }
};

//fetch all message from db
export const getAllMessageAction = () => async (dispatch) => {
  try {
    //define search query
    const q = query(collection(db, "message"));

    //run queries to get data
    let message = [];

    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      message.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    dispatch(setMessage(message));
  } catch (error) {
    toast.error(error.message);
  }
};

//delete message
export const deleteMessageAction = (id) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "message", id));

    toast.success("messsage has been deleted");
    dispatch(getAllMessageAction());
  } catch (error) {
    toast.error(error.message);
  }
};
