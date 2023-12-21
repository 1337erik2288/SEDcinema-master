import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const GenreBar = observer(() => {
    const {film} = useContext(Context);

    const getAllFilms = () => {
        film.setSelectedGenre("all");
        film.setSelectedMoviemaker("all");
    }

    return (
        <ListGroup className="list-group-item-warning list-group-item-action">
            <ListGroup.Item
                style={{cursor: "pointer", color: "black"}}
                active={"all" === film.selectedGenre}
                className="list-group-item-warning list-group-item-action"
                onClick={getAllFilms}
            >
                All
            </ListGroup.Item>
            {film.genres.map(genre =>
                <ListGroup.Item
                    style={{cursor: "pointer", color: "black"}}
                    className="list-group-item-warning list-group-item-action"
                    active={genre.id === film.selectedGenre.id}
                    key={genre.id}
                    onClick={() => film.setSelectedGenre(genre)}
                >
                    {genre.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default GenreBar;
