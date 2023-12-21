import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Modal} from "react-bootstrap";
import {deleteMoviemaker, deleteGenre, fetchMoviemaker, fetchGenres} from "../../http/filmAPI";

const DeleteMoviemakerOrGenre = ({show, onHide, showSuccessMsgFunc}) => {
    const [moviemakerOrGenre, setMoviemakerOrGenre] = useState("moviemaker");
    const [moviemakers, setMoviemakers] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectMoviemaker, setSelectMoviemaker] = useState({name: "Производитель фильмов не выбран"});
    const [selectGenre, setSelectGenre] = useState({name: "Жанр не выбран"});
    const [showMsgErr, setShowMsgErr] = useState(false);
    const [msgErr, setMsgErr] = useState('');

    useEffect(() => {
        fetchGenres().then(data => setGenres(data));
        fetchMoviemaker().then(data => setMoviemakers(data));
    }, []);

    const Delete = async () => {
        if(moviemakerOrGenre === "Moviemaker") {
            if(selectMoviemaker.name !== "Производитель фильмов не выбран") {
                await deleteMoviemaker(selectMoviemaker.id).then(data => {
                    showSuccessMsgFunc(data);
                    onHide();
                    setSelectMoviemaker({name: "Производитель фильмов не выбран"});
                });
            } else {
                setMsgErr("Пожалуйста выберите жанр");
                setShowMsgErr(true);
            }
        } else {
            if(selectGenre.name !== "Жанр не выбран") {
                await deleteGenre(selectGenre.id).then(data => {
                    showSuccessMsgFunc(data);
                    onHide();
                    setSelectGenre({name: "Жанр не выбран"});
                });
            } else {
                setMsgErr("Пожалуйста выберите жанр");
                setShowMsgErr(true);
            }
        }
    };

    useEffect(() => setShowMsgErr(false), [selectGenre, selectMoviemaker, moviemakerOrGenre])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Удалить жанр или производителя фильмов
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showMsgErr &&
                    <>
                        <p style={{color: "red", textAlign: "center"}}>{msgErr}</p>
                    </>
                }

                Choose Category:
                <Dropdown className="mb-3" style={{margin: "0 auto"}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {moviemakerOrGenre}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {moviemakerOrGenre === "Moviemaker" ? <Dropdown.Item disabled>Производитель фильмов</Dropdown.Item> : <Dropdown.Item onClick={() => setMoviemakerOrGenre("Moviemaker")}>Производитель фильмов</Dropdown.Item>}
                        {moviemakerOrGenre === "Genre" ? <Dropdown.Item disabled>Жанр</Dropdown.Item> : <Dropdown.Item onClick={() => setMoviemakerOrGenre("Genre")}>Жанр</Dropdown.Item>}
                    </Dropdown.Menu>
                </Dropdown>

                Choose item of {moviemakerOrGenre === "Moviemaker" ? "Moviemaker" : "Genre"}
                <Dropdown className="mb-3" style={{margin: "0 auto"}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {moviemakerOrGenre === "Moviemaker" ? selectMoviemaker.name : selectGenre.name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {moviemakerOrGenre === "Moviemaker" ?
                            moviemakers.map(({id, name}) =>
                                selectMoviemaker.name === name ? <Dropdown.Item disabled key={id}>{name}</Dropdown.Item> : <Dropdown.Item  key={id} onClick={() => setSelectMoviemaker({id, name})}>{name}</Dropdown.Item>
                            )
                            :
                            genres.map(({id, name}) =>
                                selectGenre.name === name ? <Dropdown.Item disabled  key={id}>{name}</Dropdown.Item> : <Dropdown.Item  key={id} onClick={() => setSelectGenre({id, name})}>{name}</Dropdown.Item>
                            )
                        }

                    </Dropdown.Menu>
                </Dropdown>


            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-danger" onClick={Delete}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteMoviemakerOrGenre;
