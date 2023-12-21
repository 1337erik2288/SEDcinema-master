import {makeAutoObservable} from "mobx";

export default class FilmStore {
    constructor() {
        this._genres = [];
        this._moviemakers = [];
        this._films = [];
        this._selectedGenre = {};
        this._selectedMoviemaker = {};
        this._page = 1;
        this._totalCount = 0;
        this._limit = 9;
        makeAutoObservable(this);
    }

    setSelectedGenre(selectedGenre) {
        this.setPage(1);
        this._selectedGenre = selectedGenre;
    }
    setSelectedMoviemaker(selectedMoviemaker) {
        this.setPage(1);
        this._selectedMoviemaker = selectedMoviemaker;
    }
    setGenres(genres) {
        this._genres = genres;
    }
    setMoviemakers(moviemakers) {
        this._moviemakers = moviemakers;
    }
    setFilms(films) {
        this._films = films;
    }
    setPage(page) {
        this._page = page;
    }
    setTotalCount(totalCount) {
        this._totalCount = totalCount;
    }

    get genres() {
        return this._genres;
    }
    get moviemakers() {
        return this._moviemakers;
    }
    get films() {
        return this._films;
    }
    get selectedGenre() {
        return this._selectedGenre;
    }
    get selectedMoviemaker() {
        return this._selectedMoviemaker;
    }
    get page() {
        return this._page;
    }
    get totalCount() {
        return this._totalCount;
    }
    get limit() {
        return this._limit;
    }
}
