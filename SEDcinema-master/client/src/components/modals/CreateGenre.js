import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createGenre} from "../../http/filmAPI";

const CreateGenre = ({show, onHide}) => {
    const [value, setValue] = useState('');
    const addGenre = () => {
        createGenre({name: value}).then(() => {
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
                    Добавить новый жанр
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder="Введите название нового жанра..."
                        onChange={e => setValue(e.target.value)}
                        value={value}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addGenre}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateGenre;
