import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import FilmItem from "./FilmItem";

const FilmList = observer(() => {
    const {film} = useContext(Context);

    return (
        <Row className="d-flex">
            {film.films.map(film =>
                <FilmItem key={film.id} film={film}/>
            )}
        </Row>
    );
});

export default FilmList;
