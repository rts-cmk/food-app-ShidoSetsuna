import { createBrowserRouter, RouterProvider } from "react-router";

import Home from "./pages/home.jsx";
import Info from "./pages/info.jsx";
import Profile from "./pages/profile.jsx";
import Favourites from "./pages/favourites.jsx";
import ErrorPage from "./pages/error.jsx";
import Layout from "./components/layout/Layout.jsx";
import "./style/main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "info/:id",
        element: <Info />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "menu",
        element: <Home />,
      },
      {
        path: "favorites",
        element: <Favourites />,
      },
      {
        path: "add",
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
