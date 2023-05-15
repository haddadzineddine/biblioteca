import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Library } from "./components/Library";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/library",
        element: <Library />,
    }
]);