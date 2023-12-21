import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import UserStore from "./store/UserStore";
import FilmStore from "./store/FilmStore";
import WatchlistStore from "./store/WatchlistStore";

export const Context = createContext(null);

ReactDOM.render(
    <Context.Provider value={
        {
            user: new UserStore(),
            film: new FilmStore(),
            watchlist: new WatchlistStore(),
        }
    }>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);
