import {makeAutoObservable} from "mobx";
import {deleteFilmFromWatchlist} from "../http/filmAPI";

export default class WatchlistStore {
    constructor() {
        this._watchlist = [];
        makeAutoObservable(this);
    }

    async setDeleteItemWatchlist(film, isAuth = false) {
        if(isAuth) {
            await deleteFilmFromWatchlist(film.id).then(() => {
                this._watchlist = this._watchlist.filter(item => item.id !== film.id);
            });
        } else {
            this._watchlist = this._watchlist.filter(item => item.id !== film.id);

            localStorage.setItem("watchlist", JSON.stringify(this._watchlist));
        }
    }

    setWatchlist(item, isAuth = false) {
        const checkFilmInWatchlist = this._watchlist.findIndex(film => film.id === item.id);
        if(checkFilmInWatchlist < 0) {
            this._watchlist = [...this._watchlist, { count: 1, ...item}];
        }

        if(!isAuth) {
            localStorage.setItem("watchlist", JSON.stringify(this._watchlist));
        }
    }

    setDeleteAllFilmFromWatchlist() {
        return this._watchlist = [];
    }

    resetWatchlist() {
        this._watchlist = [];
        localStorage.removeItem('watchlist');
    }


    get Watchlist() {
        return this._watchlist;
    }
}
