import { Box, Card, CardContent, CardHeader, Stack, Typography, } from '@mui/material';
import {selectAllPosts} from './postSclice'
import React from 'react'
import {useSelector , useDispatch} from 'react-redux';



const PostList = () => {
    const posts = useSelector(selectAllPosts);
    const RenderPosts = posts.map (post => (
        <Card key={post.id} sx={{ margin: 2 , border: "1px solid #ffff", ":hover":{border: "1px solid #ccc"}}}>
            <CardHeader title={post.title} subheader={post.date}/>
            <CardContent>
            <Typography variant="body1" color="text.secondary" >{post.content}</Typography>
            </CardContent>
        </Card>
    ))
  return (
    <Stack direction="column"  width={{ xs: "90vw", sm: "80vw", md: "60vw", lg: "40vw",   }}  spacing={2}>
        <Typography variant="h4">Posts</Typography>
        {RenderPosts}
    </Stack>
  )
}

export default PostList