import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layout/RootLayout';
import Home from '../Pages/Home/Home';
import Forecast from '../Pages/Forecast/Forecast';
import Weekly from '../Pages/Weekly/Weekly';
import AirQuality from '../Pages/AirQuality/AirQuality';
import MapView from '../Pages/MapView/MapView';
import UvSunInfo from '../Pages/UvSunInfo/UvSunInfo';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,

        children: [
            { path: '/', element: <Home /> },
            { path: '/forecast', element: <Forecast /> },
            { path: '/weekly', element: <Weekly /> },
            { path: '/air-quality', element: <AirQuality /> },
            { path: '/map', element: <MapView /> },
            { path: '/uv-sun', element: <UvSunInfo /> },
        ],
    },
]);