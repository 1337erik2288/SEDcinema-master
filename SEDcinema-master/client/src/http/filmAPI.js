import {$authHost, $host} from "./index";

export const createGenre = async (genre) => {
    const {data} = await $authHost.post('api/genre', genre);
    return data;
}

export const fetchGenres = async () => {
    const {data} = await $host.get('api/genre');
    return data;
}

export const deleteGenre = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/genre/'+id});
    return data;
}

export const createMoviemaker = async (moviemaker) => {
    const {data} = await $authHost.post('api/moviemaker', moviemaker);
    return data;
}

export const fetchMoviemaker = async () => {
    const {data} = await $host.get('api/moviemaker');
    return data;
}

export const deleteMoviemaker = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/moviemaker/'+id});
    return data;
}

export const createFilm = async (film) => {
    const {data} = await $authHost.post('api/film', film);
    return data;
}

export const fetchFilm = async (genreId, moviemakerId, page, limit = 9) => {
    const {data} = await $host.get('api/film', {params: {
            genreId, moviemakerId, page, limit
        }});
    return data;
}

export const fetchOneFilm = async (id) => {
    const {data} = await $host.get(`api/film/${id}`);
    return data;
}

export const fetchDeleteFilm = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:`api/film/${id}`});
    return data;
}

export const updateFilms = async (id, body) => {
    const {data} = await $authHost({method:'PUT', url:`api/film/${id}`, data: body});
    return data;
}

export const getAllFilmsInAdminPage = async (name, page = 1, filter = "All") => {
    const {data} = await $authHost({method:'GET', url:`api/film/search?page=${page}&name=${name}&filter=${filter}`});
    return data;
}

export const addFilmToWatchlist = async (film) => {
    const {data} = await $authHost.post('api/watchlist', film);
    return data;
}

export const getFilmFromWatchlist = async () => {
    const {data} = await $authHost.get('api/watchlist');
    return data;
}

export const deleteFilmFromWatchlist = async (id) => {
    const {data} = await $authHost.delete(`api/watchlist/${id}`);
    return data;
}