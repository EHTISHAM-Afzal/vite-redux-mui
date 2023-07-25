import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function Skeletons() {
  return (
    <Box className=" w-[90vw] sm:[80vw] md:[60vw] lg:[50vw] xl:[40vw] space-y-4 ">
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
    </Box>
  );
}
