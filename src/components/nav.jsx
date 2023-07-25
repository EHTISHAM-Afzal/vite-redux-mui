import React from "react";
import { Link, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const NaveBar = () => {
  return (
    <div className=" w-[95vw] sm:[80vw] md:[60vw] lg:[50vw] xl:[40vw]  max-w-full  flex flex-col justify-center items-center">
      <AppBar position="relative" color="primary" className="mb-4">
        <Toolbar className="flex flex-row justify-between items-center">
          <Typography variant="h4" float="left" >
            <Link to="/">Redux Blog</Link>
             
          </Typography>
          <Typography variant="h7"  float="right" color="white"   className="space-x-2">
            <Link to="/">Home</Link>
            <Link to="/post">CreatePost</Link>
            <Link to="user">Users</Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="max-w-full self-center">
        <Outlet />
      </div>
    </div>
  );
};

export default NaveBar;
