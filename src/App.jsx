import React from "react";
import PostList from "./features/posts/postsList";
import AddPostForm from "./features/posts/AddPostForm";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route,} from "react-router-dom";
import NaveBar from "./components/nav";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm";
import UsersList from "./features/Users/UsersList";
import UserPage from "./features/Users/UserPage";
import NotFound from "./components/NotFound";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<NaveBar />}>
        <Route index element={<PostList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>

        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </>
  )
);

const App = () => {
  return <RouterProvider router={routes} />;
};

export default App;
