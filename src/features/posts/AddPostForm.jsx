import { Box, Input, Typography, Button, TextField, MenuItem , FormControl, FormHelperText, InputLabel , Select} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAllUsers } from "../Users/usersSlice";
import { addNewPost } from "./postSclice";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map((user) => (
    <MenuItem key={user.id} value={user.id}>
      {user.name}
    </MenuItem>
  ));

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
      <Button variant="outlined"  disabled={!canSave} onClick={onSavePostClicked} sx={{ mt: 2 , alignSelf: "self-end" }}>
        Add Post
      </Button>
    </Box>
  );
};
export default AddPostForm;
