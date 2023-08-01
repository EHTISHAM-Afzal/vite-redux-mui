import { Box, Button } from "@mui/material";
import { useAddReactionMutation } from "./postSclice";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionButtons = ({ post }) => {
  const [addReaction] = useAddReactionMutation();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <Button
        variant="text"
        color="primary"
        key={name}
        type="button"
        className="reactionButton"
        onClick={() => {
          const newValue = post.reactions[name] + 1
          addReaction({ postId: post.id, reactions : { ...post.reactions , [name]: newValue }})
        }
        }
      >
        {emoji} {post.reactions[name]}
      </Button>
    );
  });

  return <Box>{reactionButtons}</Box>;
};
export default ReactionButtons;
