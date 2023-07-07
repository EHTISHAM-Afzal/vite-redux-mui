import { Box, Typography, Button, AppBar, Toolbar, Step, StepLabel } from '@mui/material'
import React from 'react'
import PostsList from './features/posts/posts'
import AddPostForm from './features/posts/AddPostForm'
// now import the react router dom
import { RouterProvider , createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import NaveBar from './nav'


const routes = createBrowserRouter(createRoutesFromElements(
  <>
  <Route path="/" element={<NaveBar />}>
  <Route index element={<PostsList />} />
  <Route path="create" element={<AddPostForm />} />
  </Route>
  <Route path="*" element={<h1>404 Not Found</h1>}/>
  </>
))

const App = () => {
  return (
    <RouterProvider router={routes} />
  )
}

export default App