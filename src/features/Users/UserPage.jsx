import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectPostsByUser } from "../posts/postSclice";
import { selectUserById } from "./usersSlice";
import { List, Link as MUILink } from "@mui/material";
import { Box, Typography,  } from "@mui/material";

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const postsForUser = useSelector((state) =>
    selectPostsByUser(state, Number(userId))
  );

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <MUILink  component={Link} to={`/post/${post.id}`}>
        ✏️{post.title}
      </MUILink>
    </li>
  ));

  return (
    <Box>
      <Typography variant="h4" color="primary">
        Posts by {user.name}
      </Typography>
      <List>{postTitles}</List>
    </Box>
  );
};

export default UserPage;
