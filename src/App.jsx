import React from "react";
import PostList from "./features/posts/postsList";
import AddPostForm from "./features/posts/AddPostForm";
// now import the react router dom
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import NaveBar from "./nav";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<NaveBar />}>
        <Route index element={<PostList />} />
        <Route path="post" element={<AddPostForm />} />
        <Route path="post/:postId" element={<SinglePostPage />} />
        <Route path="post/edit/:postId" element={<EditPostForm />} />
      </Route>
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </>
  )
);

const App = () => {
  return <RouterProvider router={routes} />;
};

export default App;
