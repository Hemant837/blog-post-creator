import React, { Fragment } from "react";
import BlogComponent from "./BlogComponent";
// import dummyBlogs from "./dummyArray";
import { useSelector } from "react-redux";

const Blogs = () => {
  const blogItems = useSelector((state) => state.blog.blogItems);

  return (
    <Fragment>
      <h2 className="text-center font-bold text-3xl mt-4">Blogs</h2>
      <ul className="flex flex-wrap ">
        {blogItems.map((blog) => (
          <li className="ml-20 mt-6" key={blog.firebaseId}>
            <BlogComponent
              id={blog.firebaseId}
              title={blog.title}
              content={blog.content}
            />
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Blogs;
