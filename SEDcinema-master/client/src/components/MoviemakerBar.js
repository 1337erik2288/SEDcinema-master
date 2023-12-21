import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const MoviemakerBar = observer(()  => {
    const {film} = useContext(Context);
    return (
        <Row className="d-flex">
            {film.moviemakers.map(moviemaker =>
                <Card
                    style={{
                        cursor: "pointer",
                        background: moviemaker.id === film.selectedMoviemaker.id ? "yellow" : "black",
                        color: moviemaker.id === film.selectedMoviemaker.id ? "black" : "yellow"
                    }}
                    key={moviemaker.id}
                    className="p-3"
                    onClick={() => film.setSelectedMoviemaker(moviemaker)}
                >
                    {moviemaker.name}
                </Card>
            )}
        </Row>
    );
});

export default MoviemakerBar;
