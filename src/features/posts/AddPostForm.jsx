import {
  Box,
  Input,
  Typography,
  Button,
  MenuItem,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import {  useGetUsersQuery } from "../Users/usersSlice";
import { useAddNewPostMutation } from "./postSclice";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
  const [addNewPost, { isloading }] = useAddNewPostMutation();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const { data: users, isSuccess, isError, error } = useGetUsersQuery();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave = [title, content, userId].every(Boolean) && !isloading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await addNewPost({ title, body: content, userId }).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };


  let usersOptions 
  if(isSuccess){
    usersOptions = users.ids.map((user) => (
      <MenuItem key={user} value={user}>
        {users.entities[user].name}
      </MenuItem>
    ));
  }


  return (
    <Box sx={{ p: 2, mt: 2, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="body1" color="initial">
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
      <Button
        variant="outlined"
        disabled={!canSave}
        onClick={onSavePostClicked}
        sx={{ mt: 2, alignSelf: "self-end" }}
      >
        Add Post
      </Button>
    </Box>
  );
};
export default AddPostForm;
