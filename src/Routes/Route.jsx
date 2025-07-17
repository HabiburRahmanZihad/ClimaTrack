import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layout/RootLayout';
import Home from '../Pages/Home/Home';
import Forecast from '../Pages/Forecast/Forecast';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,

        children: [
            { path: '/', element: <Home /> },
            { path: '/forecast', element: <Forecast /> },
        ],
    },
]);