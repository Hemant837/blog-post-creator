import { Fragment } from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router";
import { Suspense } from "react";

const RootLayout = () => {
  return (
    <Fragment>
      <Navbar />
      <Suspense
        fallback={<div className="font-semibold text-center">Loading...</div>}
      >
        <Outlet />
      </Suspense>
    </Fragment>
  );
};

export default RootLayout;
