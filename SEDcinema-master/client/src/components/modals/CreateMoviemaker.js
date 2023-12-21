import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createMoviemaker} from "../../http/filmAPI";

const CreateMoviemaker = ({show, onHide}) => {
    const [value, setValue] = useState('');
    const addMoviemaker = () => {
        createMoviemaker({name: value}).then(data => {
            setValue('')
            onHide();
        });
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Добавить производителя фильмов
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder="Введите производителя фильмов..."
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={() => addMoviemaker()}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateMoviemaker;
