import { useEffect } from "react";
import generateData from "../FakeData";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-center m-8">
        Lets render a Table!
      </h1>
      <section className="align-element py-20">
        <Outlet />
      </section>
    </>
  );
};

export default HomeLayout;
