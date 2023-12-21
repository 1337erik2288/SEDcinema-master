import React, { useContext } from 'react';
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { Context } from "../index";
import { NavLink } from "react-router-dom";

const OneFilmInWatchlist = ({ film }) => {
    const { watchlist, user } = useContext(Context);

    return (
        <Card key={film.id} style={{ width: "100%" }} className="mb-3">
            <Card.Body style={{ background: "black" }}>
                <Row>
                    <Col xs={4}>
                        <Image src={process.env.REACT_APP_API_URL + film.img} style={{ width: "100%", maxWidth: 250 }} />
                    </Col>
                    <Col xs={4} style={{ color: "yellow", textAlign: "center", fontSize:"42px"}}>
                        <Row>
                            <Col xs={12}>
                                <b>Название:</b>
                                <NavLink
                                    className="link-warning"
                                    to={`/film/${film.id}`}>{film.name}</NavLink>
                            </Col>
                        </Row>
                        <br /><br />
                    </Col>
                    <Col xs={4}>
                        <Row>
                            <Col xs={12} className="d-flex justify-content-center">
                                {user.isAuth ? (
                                    <Button variant="outline-warning"
                                            onClick={() => watchlist.setDeleteItemWatchlist(film, true)}
                                            style={{width:"250px", height:"100px", alignItems:"center"}}
                                    >
                                        Удалить из списка
                                    </Button>
                                ) : (
                                    <Button variant="outline-warning" onClick={() => watchlist.setDeleteItemWatchlist(film)}>Удалить из списка</Button>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default OneFilmInWatchlist;