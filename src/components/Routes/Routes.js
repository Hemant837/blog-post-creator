import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Root/RootLayout";
import Login from "../Authentication/Login";

const HomePage = lazy(() => import("../HomePage/HomePage"));
const Blogs = lazy(() => import("../Blogs/Blogs"));
const BlogView = lazy(() => import("../Blogs/BlogView"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/blogs/",
        element: <Blogs />,
      },
      {
        path: "/blogs/:blogId",
        element: <BlogView />,
      },
      {
        path: "*",
        element: <div>Sorry, Page not available at the moment</div>,
      },
    ],
  },
]);

export default router;
