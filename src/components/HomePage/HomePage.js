import React, { useState } from "react";
import axios from "axios";
import { blogAction } from "../../store/blog-slice";
import { useDispatch, useSelector } from "react-redux";
import formatEmail from "../function/formatEmail";

const HomePage = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.userEmail);

  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const blogData = {
      id: Math.random().toString(),
      title: blogTitle,
      content: blogContent,
    };

    // console.log("Blog Title:", blogTitle);
    // console.log("Blog Content:", blogContent);

    try {
      const sendBlogData = await axios.post(
        `https://blog-post-creator-16c8c-default-rtdb.firebaseio.com/${formatEmail(
          userEmail
        )}/blogsData.json`,
        blogData
      );
      console.log(sendBlogData.data);

      setBlogTitle("");
      setBlogContent("");
    } catch (error) {
      console.log(error);
    }

    dispatch(blogAction.addBlog(blogData));
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-4">Blog Form</h2>

      <div className="mb-4">
        <label
          htmlFor="blogTitle"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Blog Title
        </label>
        <input
          type="text"
          id="blogTitle"
          name="blogTitle"
          value={blogTitle}
          onChange={(event) => setBlogTitle(event.target.value)}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="blogContent"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Blog Content
        </label>
        <textarea
          id="blogContent"
          name="blogContent"
          value={blogContent}
          onChange={(event) => setBlogContent(event.target.value)}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="4"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
      >
        Publish Blog
      </button>
    </form>
  );
};

export default HomePage;
