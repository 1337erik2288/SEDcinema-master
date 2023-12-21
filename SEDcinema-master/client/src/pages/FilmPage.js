import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from './../assets/star.png';
import {useParams} from 'react-router-dom';
import {addFilmToWatchlist, fetchOneFilm} from "../http/filmAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import ReactImageMagnify from 'react-image-magnify';
import heart from "../assets/icons8-heart-30.png";
import blankHeart from "../assets/blankHeart.png";

const FilmPage = observer(() => {
    const {user, watchlist} = useContext(Context);
    const [film, setFilm] = useState({info: []});
    const {id} = useParams();


    useEffect( () => {
        fetchOneFilm(id).then(data => setFilm(data));

    },[id]);

    const isFilmInWatchlist = () => {
        const findDevice = watchlist.Watchlist.findIndex(item => Number(item.id) === Number(film.id));
        return findDevice < 0;
    }

    const addFilmInWatchlist = (film) => {
        if(user.isAuth) {
            addFilmToWatchlist(film).then(() => watchlist.setWatchlist(film, true))
        } else {
            watchlist.setWatchlist(film);
        }
    }

    return (
        <Container className="mt-3">
            <Row className="border">
                <Col md={4}>

                </Col>
                <Col md={4} className="border-4 border-warning">
                    <ReactImageMagnify {...{
                        smallImage: {
                            alt: 'Wristwatch by Ted Baker London',
                            isFluidWidth: true,
                            src: process.env.REACT_APP_API_URL + film.img
                        },
                        largeImage: {
                            src: process.env.REACT_APP_API_URL + film.img,
                            width: 1200,
                            height: 1800
                        }
                    }} />
                </Col>
                <Col md={4}>

                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, background: "black", color:"yellow"}}
                    >
                        <h3>Id фильма:</h3>
                        <h3>{film.id}</h3>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray', background: "black"}}
                    >
                        <h3
                            style={{color:"yellow"}}
                        >
                            {film.name}
                        </h3>
                        { isFilmInWatchlist() ?
                            <Button variant="warning" onClick={() => addFilmInWatchlist(film)}>
                                Добавить в список
                                <Image src={blankHeart} style={{width: "100%", maxWidth: 30}} alt="playlist"/>
                            </Button>
                            :
                            <Button variant="outline-warning" disabled>
                                Уже в вашем списке
                                <Image src={heart} style={{width: "100%", maxWidth: 30}} alt="playlist"/>
                            </Button>
                        }

                    </Card>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, background: "black", color:"yellow"}}
                    >
                        <h3>Бюджет фильма:</h3>
                        <h3>{film.budget}</h3>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
});

export default FilmPage;