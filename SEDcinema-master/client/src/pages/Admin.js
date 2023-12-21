import React, {useEffect, useState} from 'react';
import {
    Button,
    Col,
    Container,
    Dropdown,
    Form,
    Image,
    InputGroup,
    ListGroup,
    Pagination,
    Row
} from "react-bootstrap";

import CreateFilm from "../components/modals/CreateFilm";
import CreateMoviemaker from "../components/modals/CreateMoviemaker";
import CreateGenre from "../components/modals/CreateGenre";
import {getAllFilmsInAdminPage} from "../http/filmAPI";
import {NavLink, useNavigate} from "react-router-dom";
import {FILM_EDIT_ROUTE, FILM_LIST_EDIT_ROUTE} from "../utils/consts";
import DeleteMoviemakerOrGenre from "../components/modals/DeleteMoviemakerOrGenre";

const Admin = () => {
    const [moviemakerVisible, setMoviemakerVisible] = useState(false);
    const [genreVisible, setGenreVisible] = useState(false);
    const [filmVisible, setFilmVisible] = useState(false);
    const [deleteMoviemakerOrGenre, setDeleteMoviemakerOrGenre] = useState(false);

    const [searchFilm, setSearchFilm] = useState('');
    const [searchedFilms, setSearchedFilms] = useState([]);
    const [filter, setFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(1);

    const [successMsg, setSuccessMsg] = useState('');
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);
    const navigate = useNavigate()

    //pagination
    const limit = 5;
    const pageCount = Math.ceil(Number(count) / limit);
    const pages = [];
    for (let number = 1; number < pageCount + 1; number++) {
        pages.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }


    useEffect(() => {
        getAllFilmsInAdminPage(searchFilm, currentPage, filter).then(({count, rows}) => {
            setSearchedFilms(rows);
            setCount(count)
        })
    }, [currentPage])

    useEffect(() => {
        getAllFilmsInAdminPage(searchFilm, 1, filter).then(({count, rows}) => {
            setSearchedFilms(rows);
            setCount(count);
            setCurrentPage(1);
        })
    }, [filter, successMsg])


    const fetchFilm = () => {
        getAllFilmsInAdminPage(searchFilm, currentPage, filter).then(({count, rows}) => {
            setSearchedFilms(rows);
            setCount(count)
        })
    };

    const showSuccessMsgFunc = (msg) => {
        setSuccessMsg(msg);
        setShowSuccessMsg(true);
        setTimeout(() => setShowSuccessMsg(false), 5000);
    }

    return (
        <Container className="d-flex flex-column">
            {showSuccessMsg && <p>{successMsg}</p>}

            <Button
                onClick={() => setGenreVisible(true)}
                variant="outline-warning"
                className="mt-4 p-2"
            >
                Добавить жанр
            </Button>
            <Button
                onClick={() => setMoviemakerVisible(true)}
                variant="outline-warning"
                className="mt-4 p-2"
            >
                Добавить производителя фильмов
            </Button>
            <Button
                onClick={() => setDeleteMoviemakerOrGenre(true)}
                variant="outline-warning"
                className="mt-4 p-2"
            >
                Удалить производителя фильмов или жанр
            </Button>


            <Button
                onClick={() => setFilmVisible(true)}
                variant="outline-warning"
                className="mt-4 p-2"
            >
                Добавить фильм
            </Button>
            <Button
                onClick={() => navigate(FILM_LIST_EDIT_ROUTE)}
                variant="outline-warning"
                className="mt-4 p-2"
            >
                Редактировать фильм
            </Button>

            <CreateFilm show={filmVisible} onHide={() => setFilmVisible(false)}/>
            <CreateMoviemaker show={moviemakerVisible} onHide={() => setMoviemakerVisible(false)}/>
            <CreateGenre show={genreVisible} onHide={() => setGenreVisible(false)}/>
            <DeleteMoviemakerOrGenre show={deleteMoviemakerOrGenre} onHide={() => setDeleteMoviemakerOrGenre(false)} showSuccessMsgFunc={showSuccessMsgFunc}/>


        </Container>
    );
};

export default Admin;
