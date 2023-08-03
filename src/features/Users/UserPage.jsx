import { Link, useParams } from "react-router-dom";
import { useGetPostsByUserIdQuery } from "../posts/postSclice";
import { useGetUsersQuery } from "./usersSlice";
import { List, Link as MUILink } from "@mui/material";
import { Box, Typography } from "@mui/material";

const UserPage = () => {
  const { userId } = useParams();

  const {
    user,
    isLoading: isLoadingUser,
    isSuccess: isSuccessUser,
    isError: isErrorUser,
    error: errorUser,
  } = useGetUsersQuery("getUsers", {
    selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
      user: data?.entities[userId],
      isLoading,
      isSuccess,
      isError,
      error,
    }),
  });

  const {
    data: postsForUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsByUserIdQuery(userId);

  let content;
  if (isLoading || isLoadingUser) {
    content = <p>Loading...</p>;
  } else if (isSuccess && isSuccessUser) {
    const { ids, entities } = postsForUser;
    content = (
      <Box>
        <Typography variant="h4" color="primary">
          Posts by {user.name}
        </Typography>
        <List>
          {ids.map((id) => (
            <li key={id}>
              <MUILink component={Link} to={`/post/${id}`}>
                ✏️{entities[id].title}
              </MUILink>
            </li>
          ))}
        </List>
      </Box>
    );
  } else if (isError || isErrorUser) {
    content = <p>{error || errorUser}</p>;
  }

  return content;
};

export default UserPage;
