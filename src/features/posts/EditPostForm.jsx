import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "./postSclice";
import { useParams, useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../Users/usersSlice";
import {
  Box,
  Input,
  Typography,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Card,
  FormControl,
  FormLabel,
  FormHelperText,
  ListItem,
} from "@mui/material";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const {
    post,
    isLoading: isLoadingPosts,
    isSuccess,
  } = useGetPostsQuery("getPosts", {
    selectFromResult: ({ data, isLoading, isSuccess }) => ({
      post: data?.entities[postId],
      isLoading,
      isSuccess,
    }),
  });

  const { data: users, isSuccess: isSuccessUsers } =
    useGetUsersQuery("getUsers");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setTitle(post.title);
      setContent(post.body);
      setUserId(post.userId);
    }
  }, [isSuccess, post?.title, post?.body, post?.userId]);

  if (isLoadingPosts) return <p>Loading...</p>;

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

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await updatePost({
          id: post?.id,
          title,
          body: content,
          userId,
        }).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };

  let usersOptions;
  if (isSuccessUsers) {
    usersOptions = users.ids.map((id) => (
      <MenuItem key={id} value={id}>
        {users.entities[id].name}
      </MenuItem>
    ));
  }

  const onDeletePostClicked = async () => {
    try {
      await deletePost({ id: post?.id }).unwrap();

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
      sx={{ p: 2, mt: 2, borderRadius: 2, maxWidth: "100%", width: "100%" }}
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
        <InputLabel id="SelectUser">SelectUser</InputLabel>
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
        <FormHelperText>
          Select User to post on it's profile page
        </FormHelperText>
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
