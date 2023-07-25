import {
  Stack,
  Typography,
} from "@mui/material";
import { getPostsStatus, getPostsError,  selectPostIds } from "./postSclice";
import { useSelector,  } from "react-redux";
import PostsExcerpt from "./PostsExerpt";
import Skeletons from "../../components/skeleton";
const PostList = () => {

  const orderedPostIds = useSelector(selectPostIds)
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);


  let content;
  if (postsStatus === "loading") {
    content = <Skeletons/>;
  } else if (postsStatus === "succeeded") {
    content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} />)
    } else if (postsStatus === "failed") {
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
