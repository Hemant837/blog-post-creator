import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: { blogItems: [] },
  reducers: {
    addBlog(state, action) {
      state.blogItems.push(action.payload);
    },
    replaceBlogs(state, action) {
      state.blogItems = action.payload;
    },
  },
});

export const blogAction = blogSlice.actions;

export default blogSlice;
