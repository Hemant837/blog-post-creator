import React from "react";
import { Link } from "react-router-dom";

const BlogComponent = (props) => {
  const { id, title, content } = props;
  // Truncate the content to show only the first 80 characters
  const truncatedContent = content.substring(0, 80) + "...";

  return (
    <div className="bg-white shadow rounded-md w-96 h-48 p-6">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-4">{truncatedContent}</p>
      <div className="flex justify-end">
        <Link
          to={`/blogs/${id}`}
          className="text-blue-500 hover:underline focus:outline-none"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogComponent;
