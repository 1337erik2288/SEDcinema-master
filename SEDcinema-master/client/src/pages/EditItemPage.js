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


import {getAllFilmsInAdminPage} from "../http/filmAPI";
import {NavLink} from "react-router-dom";
import {FILM_EDIT_ROUTE} from "../utils/consts";

const EditItemPage = () => {
    const [searchFilm, setSearchFilm] = useState('');
    const [searchedFilms, setSearchedFilms] = useState([]);
    const [filter, setFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(1);

    const [successMsg, setSuccessMsg] = useState('');
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

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
            <ListGroup>
                {searchedFilms && searchedFilms.map( ({id, img, moviemaker, genre, budget, name}) => {
                    return (
                        <ListGroup.Item className="mt-3" key={id}>
                            <Row>
                                <Col xs={2}>
                                    <Image width={150} src={process.env.REACT_APP_API_URL + img}/>
                                </Col>
                                <Col xs={8}>
                                    <Row>
                                        <Col xs={12}>
                                            <NavLink to={FILM_EDIT_ROUTE + `/${id}`}>id: {id}</NavLink>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            Название: {name}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            Бюджет: {budget}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            Производитель: {moviemaker?.name || "Не указано"}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            Жанр: {genre?.name || "Не указано"}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={2}>
                                    <NavLink to={FILM_EDIT_ROUTE + `/${id}`}>Отредактировать</NavLink>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>

            <Pagination size="sm" className="mt-4 mb-4" style={{margin: "0 auto"}}>
                {searchedFilms && searchedFilms.length > 0 ? pages : false}
            </Pagination>
        </Container>
    );
};

export default EditItemPage;

