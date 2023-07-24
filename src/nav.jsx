import React from "react";
import { Link, Outlet } from "react-router-dom";

const NaveBar = () => {
  return (
    <div className=" w-[95vw] sm:[80vw] md:[60vw] lg:[50vw] xl:[40vw]  max-w-full  flex flex-col justify-center items-center">
      <div className=" max-w-full w-full   h-6 space-x-2 space-y-6  my-4 bg-slate-300">
        <Link to="/">Home</Link>
        <Link to="/post">Create Post</Link>
      </div>
      <div className="max-w-full self-center">
        <Outlet />
      </div>
    </div>
  );
};

export default NaveBar;
