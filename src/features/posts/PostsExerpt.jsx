import PostAuthor from "./postAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const PostsExcerpt = ({ post }) => {
  return (
    <Card
      key={post.id}
      sx={{
        margin: 2,
        border: "1px solid #ffff",
        ":hover": { border: "1px solid #ccc" },
      }}
    >
      <CardHeader title={post.title} />
      <CardContent>
        <Typography variant="title" color="text.secondary">
          {post.body.substring(0, 100)} ...
        </Typography>
        <Box variant="footer" color="text.secondary" sx={{ mt: 2 }}>
        <Link className=" font-semibold " to={`post/${post.id}`}>View Post </Link>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </Box>
        <ReactionButtons post={post} />
      </CardContent>
    </Card>
  );
};
export default PostsExcerpt;
