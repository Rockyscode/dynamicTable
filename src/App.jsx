import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomeLayout from "./pages/HomeLayout";
import Table from "./pages/Table";
import SingleProdcut from "./pages/SingleProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Table /> },
      { path: ":id", element: <SingleProdcut /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
