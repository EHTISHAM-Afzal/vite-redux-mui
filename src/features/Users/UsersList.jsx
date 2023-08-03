import {  useGetUsersQuery } from "./usersSlice";
import { Link } from "react-router-dom";
import { List, Link as MUILink } from "@mui/material";
import { Box, Typography } from "@mui/material";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const { ids, entities } = users;
    content = ids.map((id) => (
      <li key={id}>
        <MUILink
          underline="none"
          variant="h6"
          component={Link}
          to={`/user/${id}`}
        >
          👨‍💼{entities[id].name}
        </MUILink>
      </li>
    ));
  } else if (isError) {
    content = <p>{error.message}</p>;
  }

  return (
    <Box>
      <Typography variant="h4" color="primary">
        Users
      </Typography>
      <List>{content}</List>
    </Box>
  );
};

export default UsersList;
