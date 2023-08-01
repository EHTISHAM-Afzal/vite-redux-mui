import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useGetPostsByUserIdQuery } from "../posts/postSclice";
import { selectUserById } from "./usersSlice";
import { List, Link as MUILink } from "@mui/material";
import { Box, Typography } from "@mui/material";

const UserPage = () => {
    const { userId } = useParams()
    const user = useSelector(state => selectUserById(state, Number(userId)))

    const {
        data: postsForUser,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsByUserIdQuery(userId);

    let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const { ids, entities } = postsForUser;
    content = ids.map((id) => (
      <li key={id}>
        <MUILink component={Link} to={`/post/${id}`}>
          ✏️{entities[id].title}
        </MUILink>
      </li>
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <Box>
      <Typography variant="h4" color="primary">
        Posts by {user.name}
      </Typography>
      <List>{content}</List>
    </Box>
  );
};

export default UserPage;
