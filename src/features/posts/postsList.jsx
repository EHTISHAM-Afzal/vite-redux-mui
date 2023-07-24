import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postSclice";
import React, { Suspense, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect , } from "react";
import PostsExcerpt from "./PostsExerpt";

const PostList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);


  useEffect(() => {
    if(posts.length === 0 && postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [posts.length, dispatch]);
  

  let content;
  if (postsStatus === "loading") {
    content = <Typography>Loading...</Typography>;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
      ));
    } else if (postsStatus === "failed") {
      content = <Typography>{postsError}</Typography>;
    }
  return (
    <Stack
      direction="column"
      width={{ xs: "90vw", sm: "80vw", md: "60vw", lg: "40vw" }}
      spacing={2}
    >
      <Typography variant="h4">Posts</Typography>
      {content}
    </Stack>
  );
};

export default PostList;
