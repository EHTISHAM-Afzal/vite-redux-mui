import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { reactionAdded } from "./postSclice";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <Button
        variant="text"
        color="primary"
        key={name}
        type="button"
        className="reactionButton"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </Button>
    );
  });

  return <Box>{reactionButtons}</Box>;
};
export default ReactionButtons;
