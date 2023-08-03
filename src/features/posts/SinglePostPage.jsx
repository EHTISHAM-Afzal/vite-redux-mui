import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import PostAuthor from "./postAuthor";
import { useGetPostsQuery } from "./postSclice";

const SinglePostPage = () => {
  const { postId } = useParams();

    const {post} = useGetPostsQuery("getPosts", {
    selectFromResult: ({ data }) => ({
      post: data?.entities[postId],
    }),
  });

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <Card
      key={post.id}
      sx={{
        margin: 2,
        maxWidth: "100%",
        border: "1px solid #ffff",
        ":hover": { border: "1px solid #ccc" },
      }}
    >
      <CardHeader title={post.title} />
      <CardContent>
        <Typography variant="title" color="text.secondary">
          {post.body}
        </Typography>
        <Box variant="footer" color="text.secondary" sx={{ mt: 2 }}>
          <Link className=" font-semibold" to={`/post/edit/${post.id}`}>
            Edit Post{" "}
          </Link>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </Box>
        <ReactionButtons post={post} />
      </CardContent>
    </Card>
  );
};

export default SinglePostPage;
