import React from 'react';
import {Card, Col, Image} from "react-bootstrap";

import star from './../assets/star.png';
import {useNavigate} from 'react-router-dom';
import {FILM_ROUTE} from "../utils/consts";

const FilmItem = ({film}) => {
    const navigate = useNavigate();

    return (
        <Col md={3} className="mt-3" onClick={() => navigate(FILM_ROUTE + '/' + film.id)}>
            <Card
                className="p-2 bg-warning"
                style={{width: 200,cursor: "pointer", height:"250px"}}
                border={"Light"}
            >
                <Image style={{width: "100%",height: "80%", border: "orange", borderWidth: "3px"}} src={process.env.REACT_APP_API_URL + film.img}/>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <div className="text-black-50">{film && film?.moviemaker?.name || "Не указан"}</div>
                </div>
                <div
                    style={{fontSize: "20px"}}
                >
                    {film.name}
                </div>
            </Card>
        </Col>
    );
};

export default FilmItem;
