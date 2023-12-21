import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";


import {Context} from "../index";
import {Button, Col, Image, Row} from "react-bootstrap";
import OneFilmInWatchlist from "../components/oneFilmInWatchlist";

import emptyWatchlist from "../assets/XXL_height.jpg"
import {NavLink} from "react-router-dom";

const WatchlistPage = observer(() => {
    const {watchlist} = useContext(Context);

    if(watchlist.Watchlist.length === 0) {
        return (
            <div className="d-flex flex-column align-items-center mt-5">
                <Image src={emptyWatchlist}/>
                <div className="text-center mt-5" style={{fontSize: 28}}><b>Пустой список</b></div>
            </div>
        )
    }

    return (
        <>
            <Row className="mt-3">
                <Col xs={12}>
                    {watchlist.Watchlist.map(film => <OneFilmInWatchlist key={film.id} film={film}/>)}
                </Col>
            </Row>
        </>
    );
});

export default WatchlistPage;
