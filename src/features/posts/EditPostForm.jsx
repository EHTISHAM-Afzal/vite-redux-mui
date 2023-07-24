import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, updatePost, deletePost } from "./postSclice";
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
  Card,
} from "@mui/material";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  const dispatch = useDispatch();

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
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map((user) => (
    <MenuItem key={user.id} value={user.id}>
      {user.name}
    </MenuItem>
  ));

  const onDeletePostClicked = () => {
    try {
      setRequestStatus("pending");
      dispatch(deletePost({ id: post.id })).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <Card sx={{ p: 2, mt: 2, border: "1px solid #ccc", borderRadius: 2  , maxWidth: "100%" , width: "100%" }}>
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
      <InputLabel id="selectUser" sx={{ mt: 2 }}>
        SelectUser
      </InputLabel>
      <Select
        labelId="selectUser"
        fullWidth
        id="selectUser"
        value={userId}
        onChange={onAuthorChanged}
        label="selectUser"
      >
        {usersOptions}
      </Select>
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
      <Box sx={{ display: "flex", justifyContent: "flex-end" , my: 2 }}>
        <Button variant="contained" onClick={onSavePostClicked}>
          Update Post
        </Button>
        <Button
          variant="contained"
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
