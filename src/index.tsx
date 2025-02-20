import { createRoot } from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {HomePage} from "./pages/HomePage/HomePage";
import {PokemonsPage} from "./pages/PokemonsPage/PokemonsPage";
import {Layout} from "./layout/Layout";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {NotFoundPage} from "./pages/NotFoundPage/NotFoundPage";
import {LegendariesPage} from "./pages/LegendariesPage/LegendariesPage";

const queryClient = new QueryClient()

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
            },
            {
                path: "/legendaries",
                element: <LegendariesPage/>
            }
        ]
    },
    {
        path: "*",
        element: <NotFoundPage/>
    }

])

const root = createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
    </QueryClientProvider>

);
