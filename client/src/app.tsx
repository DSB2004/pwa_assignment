import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./page/dashboard";
import Task from "./features/dashboard/task"
import Blog from "./features/dashboard/blog";
import Overview from "./features/dashboard/overview";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      { path: "/", element: <Overview /> },
      { path: "/task", element: <Task /> },
      { path: "/blog", element: <Blog /> }
    ],

  },
]);

function App() {
  return <RouterProvider router={Router} />;
}

export default App;