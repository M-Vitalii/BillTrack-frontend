import {createBrowserRouter, RouterProvider} from "react-router-dom";

import {routes} from "@/routes/routes.tsx";

export const AppRouter = () => (
    <RouterProvider router={createBrowserRouter(routes)} />
)