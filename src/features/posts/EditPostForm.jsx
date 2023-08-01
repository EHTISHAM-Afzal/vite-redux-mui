import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, useUpdatePostMutation , useDeletePostMutation } from "./postSclice";
import { useParams, useNavigate } from "react-router-dom";
import { selectAllUsers } from "../Users/usersSlice";
import {
  Box,
  Input,
  Typography,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Card, FormControl, FormLabel, FormHelperText,
} from "@mui/material";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [updatePost, { isLoading}] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);


  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(Number(e.target.value));

  const canSave =
    [title, content, userId].every(Boolean) && !isLoading;

    const onSavePostClicked = async () => {
      if (canSave) {
          try {
              await updatePost({ id: post.id, title, body: content, userId }).unwrap()

              setTitle('')
              setContent('')
              setUserId('')
              navigate(`/post/${postId}`)
          } catch (err) {
              console.error('Failed to save the post', err)
          }
      }
  }

  const usersOptions = users.map((user) => (
    <MenuItem key={user.id} value={user.id}>
      {user.name}
    </MenuItem>
  ));

  const onDeletePostClicked = async () => {
    try {
      await deletePost({ id: post.id }).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    }
  };

  return (
    <Card
      variant="outlined"
      component="form"
      autoComplete="off"
      sx={{ p: 2, mt: 2, borderRadius: 2, maxWidth: "100%", width: "100%",}}
    >
      <Typography variant="title" color="initial">
        Add Post
      </Typography>
      <Input
        value={title}
        onChange={onTitleChanged}
        type="text"
        placeholder="Post title"
        fullWidth
        sx={{ mt: 2 }}
      />
      <FormControl variant="filled" fullWidth sx={{ mt: 2 }}>
        <InputLabel id="SelectUser" >
        SelectUser
      </InputLabel>
      <Select
        labelId="SelectUser"
        fullWidth
        id="SelectUser"
        value={userId}
        onChange={onAuthorChanged}
        label="SelectUser"
      >
        {usersOptions}
      </Select>
        <FormHelperText>Select User to post on it's profile page</FormHelperText>
      </FormControl>
      
      <Input
        value={content}
        onChange={onContentChanged}
        type="text"
        placeholder="Post content"
        fullWidth
        multiline
        rows={4}
        sx={{ mt: 2 }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}>
        <Button variant="outlined" onClick={onSavePostClicked}>
          Update Post
        </Button>
        <Button
          variant="outlined"
          type="button"
          sx={{ mx: 1 }}
          color="error"
          onClick={onDeletePostClicked}
        >
          Delete Post
        </Button>
      </Box>
    </Card>
  );
};

export default EditPostForm;
