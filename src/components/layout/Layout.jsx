import { Outlet } from "react-router";
import Nav from "../nav/nav.jsx";

export default function Layout() {
  return (
    <>
      <Outlet />

      <Nav />
    </>
  );
}
