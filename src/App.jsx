import { Box, Typography, Button } from '@mui/material'
import React from 'react'
import PostsList from './features/posts/posts'
import AddPostForm from './features/posts/AddPostForm'


const App = () => {
  return (
    <Box p={2}  >
      <AddPostForm />
      <PostsList />
    </Box>
  )
}

export default App