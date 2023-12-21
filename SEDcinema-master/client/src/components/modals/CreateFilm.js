import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { createFilm, fetchMoviemaker, fetchGenres } from "../../http/filmAPI";
import { observer } from "mobx-react-lite";
import {Context} from "../../index";

const CreateFilm = observer(({ show, onHide }) => {
    const { film } = useContext(Context);
    const [name, setName] = useState('');
    const [budget, setBudget] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);

    const [errorBudget, setErrorBudget] = useState('');

    useEffect(() => {
        fetchGenres().then(data => film.setGenres(data));
        fetchMoviemaker().then(data => film.setMoviemakers(data));
    }, []);

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }]);
    };

    const deleteInfo = (number) => {
        setInfo(info.filter(item => item.number !== number));
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i));
    };

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    const validateFields = () => {
        return (
            name &&
            budget > 0 &&
            file &&
            film.selectedMoviemaker &&
            film.selectedMoviemaker.id &&
            film.selectedGenre &&
            film.selectedGenre.id
        );
    }

    const addFilm = () => {
        if (validateFields()) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('budget', `${budget}`);
            formData.append('img', file);
            formData.append('moviemakerId', film.selectedMoviemaker.id);
            formData.append('genreId', film.selectedGenre.id);
            if (info.length > 0) {
                formData.append('info', JSON.stringify(info));
            }
            createFilm(formData).then(() => onHide());
        }
    }

    const handleBudgetChange = (e) => {
        const value = Number(e.target.value);
        if (!isNaN(value) && value >= 0) {
            setBudget(value);
            setErrorBudget('');
        } else {
            setBudget(0);
            setErrorBudget('Бюджет не может быть отрицательным.');
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Добавить новый фильм</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{film.selectedGenre.name || "Выберите жанр"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {film.genres.map(genre =>
                                <Dropdown.Item
                                    key={genre.id}
                                    onClick={() => film.setSelectedGenre(genre)}
                                >
                                    {genre.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{film.selectedMoviemaker.name || "Выберите производителя фильмов"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {film.moviemakers.map(moviemaker =>
                                <Dropdown.Item
                                    key={moviemaker.id}
                                    onClick={() => film.setSelectedMoviemaker(moviemaker)}
                                >
                                    {moviemaker.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название фильма.."
                    />
                    <Form.Control
                        value={budget}
                        onChange={handleBudgetChange}
                        className="mt-3"
                        placeholder="Введите бюджет фильма..."
                        type="number"
                        min="0"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={selectFile}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addFilm} disabled={!validateFields()}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateFilm;