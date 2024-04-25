import { Link, NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";

const Root = () => {
  // const [location, setLocation] = useState(window.location.hash);
  // const [hideHeader, setHideHeader] = useState(false);

  // useEffect(() => {
  //   const handleHashChange = () => {
  //     setLocation(window.location.hash);
  //   };

  //   window.addEventListener("hashchange", handleHashChange);

  //   return () => {
  //     window.removeEventListener("hashchange", handleHashChange);
  //   };
  // }, []);



  return (
    <div className="app">
       <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Root;
