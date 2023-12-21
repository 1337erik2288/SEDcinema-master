import {
    ADMIN_ROUTE,
    WATCHLIST_ROUTE,
    FILM_EDIT_ROUTE,
    FILM_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    CINEMA_ROUTE, FILM_LIST_EDIT_ROUTE,
} from './utils/consts';

import Admin from "./pages/Admin";
import Cinema from "./pages/Cinema";
import Auth from "./pages/Auth";
import FilmPage from "./pages/FilmPage";
import WatchlistPage from "./pages/WatchlistPage";
import FilmEditPage from "./pages/FilmEditPage";
import EditItemPage from "./pages/EditItemPage";


export const authRouters = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: FILM_EDIT_ROUTE + '/:id',
        Component: FilmEditPage
    },
    {
        path: FILM_LIST_EDIT_ROUTE,
        Component: EditItemPage
    },

];

export const publicRouters = [
    {
        path: CINEMA_ROUTE,
        Component: Cinema
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: FILM_ROUTE + '/:id',
        Component: FilmPage
    },
    {
        path: WATCHLIST_ROUTE,
        Component: WatchlistPage
    },
];
