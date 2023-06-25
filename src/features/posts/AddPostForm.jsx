import { Box, Input, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addPost } from "./postSclice";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSavePostClicked = () => {
    if (title || content) {
      dispatch(
        addPost({ 
          id: nanoid(), 
          title, 
          content, 
          date: new Date().toString()}));
    }
    setTitle("");
    setContent("");
  };
  return (
    <Box
      sx={{ p: 2,mt: 2, border: "1px solid #ccc", borderRadius: 2 , }}
    >
      <Typography variant="body1" color="initial">
        Add Post
      </Typography>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Post title"
        fullWidth
        sx={{ mt: 2 }}
      />
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        type="text"
        placeholder="Post content"
        fullWidth
        multiline
        rows={4}
        sx={{ mt: 2 }}
      />
      <Button variant="contained" onClick={onSavePostClicked} sx={{ mt: 2 }}>
        Add Post
      </Button>
    </Box>
  );
};

export default AddPostForm;
