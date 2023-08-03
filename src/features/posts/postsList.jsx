import {
  Stack,
  Typography,
} from "@mui/material";
import PostsExcerpt from "./PostsExerpt";
import Skeletons from "../../components/skeleton";
import {useGetPostsQuery} from "./postSclice"
const PostList = () => {

  const {
    data : posts,
    isLoading,
    isSuccess,
    isError,
    error
} = useGetPostsQuery('getPosts')



  let content;
  if (isLoading) {
    content = <Skeletons/>;
  } else if (isSuccess) {
    content = posts.ids.map(postId => <PostsExcerpt key={postId} postId={postId} />);
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