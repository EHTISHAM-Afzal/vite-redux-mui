import React from "react";
import { Link, Outlet } from "react-router-dom";

const NaveBar = () => {
  return (
    <div className="w-full  flex flex-col justify-center items-center">
      <div className=" w-full h-6 space-x-2 space-y-6  my-4 bg-slate-300">
        <Link to="/">Home</Link>
        {/* <Link to="/create">Create Post</Link> */}
      </div>
      <div className="min-w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default NaveBar;
