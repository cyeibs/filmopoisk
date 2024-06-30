import { createBrowserRouter } from "react-router-dom";
import { Main } from "@/pages/main";
import { Layout } from "@/app/Layout";
import { Movie } from "@/pages/movie";

export const appRouter = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <div>error</div>,
    children: [
      {
        path: "/",
        index: true,
        element: <Main />,
      },
      {
        path: "/movie/:movieId",
        element: <Movie />,
      },
    ],
  },
]);
