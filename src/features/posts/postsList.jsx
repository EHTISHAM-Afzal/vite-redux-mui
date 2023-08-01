import {
  Stack,
  Typography,
} from "@mui/material";
import {  selectPostIds } from "./postSclice";
import { useSelector,  } from "react-redux";
import PostsExcerpt from "./PostsExerpt";
import Skeletons from "../../components/skeleton";
import {useGetPostsQuery} from "./postSclice"
const PostList = () => {

  const {
    isLoading,
    isSuccess,
    isError,
    error
} = useGetPostsQuery()

  const orderedPostIds = useSelector(selectPostIds)


  let content;
  if (isLoading) {
    content = <Skeletons/>;
  } else if (isSuccess) {
    content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} />)
    } else if (isError) {
      content = <Typography>{error}</Typography>;
    }
  return (
    <Stack
      direction="column"
      width={{ maxWidth : "100%" }}
      spacing={2}
    >
      <Typography variant="h4">Posts</Typography>
      {content}
    </Stack>
  );
};

export default PostList;
