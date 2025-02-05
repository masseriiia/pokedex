import { createRoot } from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {HomePage} from "./pages/HomePage/HomePage";
import {PokemonsPage} from "./pages/PokemonsPage/PokemonsPage";
import {Layout} from "./layout/Layout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <HomePage/>
            },
            {
                path: "/pokemons",
                element: <PokemonsPage/>
            }
        ]
    },

])

const root = createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router}/>
);
