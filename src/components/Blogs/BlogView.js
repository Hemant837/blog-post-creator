import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const BlogView = () => {
  const blogItems = useSelector((state) => state.blog.blogItems);
  const { blogId } = useParams();

  // Finding the blog item with the ID
  const blogItem = blogItems.find((item) => item.firebaseId === blogId);

  // if the blog item doesn't exists
  if (!blogItem) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow-md">
      <h2 className="text-3xl font-bold mb-4">{blogItem.title}</h2>
      <p className="text-gray-600">{blogItem.content}</p>
    </div>
  );
};

export default BlogView;
