import { useEffect } from "react";
import axios from "axios";
import { RouterProvider } from "react-router-dom";
import router from "./components/Routes/Routes";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth-slice";
import { blogAction } from "./store/blog-slice";
import formatEmail from "./components/function/formatEmail";

function App() {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.userEmail);

  // making sure Authenticated
  useEffect(() => {
    const idToken = localStorage.getItem("token");
    if (idToken) {
      const fetchUserLogin = async () => {
        try {
          const userDetails = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAIY0hSLsAMXxhgtKzcbfdrmVS5xOi1zuA",
            { idToken: idToken }
          );

          dispatch(authActions.setIdToken(idToken));
          dispatch(authActions.setUserEmail(userDetails.data.users[0].email));
          dispatch(authActions.isLogin());
        } catch (error) {
          console.log(error);
        }
      };
      fetchUserLogin();
    }
  }, []);

  // for fetch blogsData
  useEffect(() => {
    const fetchBlogsData = async () => {
      try {
        const bolgsResponse = await axios.get(
          `https://blog-post-creator-16c8c-default-rtdb.firebaseio.com/${formatEmail(
            userEmail
          )}/blogsData.json`
        );

        const blogsData = Object.keys(bolgsResponse.data).map((key) => {
          return { firebaseId: key, ...bolgsResponse.data[key] };
        });

        dispatch(blogAction.replaceBlogs(blogsData));
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogsData();
  }, [userEmail]);

  return <RouterProvider router={router} />;
}

export default App;
