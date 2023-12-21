import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Dropdown, Form, Image, Modal, Row} from "react-bootstrap";
import {useParams, useNavigate} from 'react-router-dom';
import {fetchDeleteFilm, fetchOneFilm, updateFilms} from "../http/filmAPI";
import {Context} from "../index";
import {ADMIN_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";


const FilmEditPage = observer(() => {
    const {film} = useContext(Context);
    const {id} = useParams();
    const [filmCurr, setFilmCurr] = useState({});
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState("");

    const [selectMoviemaker, setSelectMoviemaker] = useState(null);
    const [selectGenre, setSelectGenre] = useState(null);
    const [name, setName] = useState("");
    const [budget, setBudget] = useState(0);
    const [img, setImg] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [info, setInfo] = useState([]);

    const [isDisabledPutBtn, setDisabledPutBtn] = useState(true);
    const navigate = useNavigate()

    const deleteDevice = () => {
        fetchDeleteFilm(id).then(() => {
            navigate(ADMIN_ROUTE); // Use navigate directly inside the function
        });
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const imgHandler = e => {
        e.preventDefault();

        const reader = new FileReader();
        reader.onload = () => {
            setImg(reader.result.toString());
        };
        reader.readAsDataURL(e.target.files[0]);
        setImgFile(e.target.files[0]);
    }

    //info
    const addInfo = () => {
        setInfo([...info, {title: '', description: '', id: Date.now()}]);
    };

    const deleteInfo = (id) => {
        setInfo(info.filter(item => item.id !== id)); // Change 'number' to 'id' for proper filtering
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.id === number ? {...i, [key]: value} : i));
    };

    const putFilm = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('budget', `${budget}`);
        formData.append('img', imgFile);
        if (selectMoviemaker) {
            formData.append('moviemakerId', selectMoviemaker.id);
        }

        if (selectGenre) {
            formData.append('genreId', selectGenre.id);
        }

        formData.append('info', JSON.stringify(info));
        updateFilms(id, formData).then(data => {
            setMsg(data); // Set the success message
            setShowMsg(true); // Show the success message
            setTimeout(() => setShowMsg(false), 5000); // Hide the message after 5 seconds
        });
    }

    const checkInfo = () => {
        let isInfoEmpty = true;
        info.forEach(item => {
            for(let key in item) {
                if(key === "title" || key === "description") {
                    if(!item[key]) {
                        isInfoEmpty = false;
                    }
                }
            }
        });
        return isInfoEmpty;
    }

    useEffect(() => {
        const isInfoEmpty = checkInfo();
        const isGenreChanged = selectGenre?.id !== filmCurr.genre?.id;
        const isMoviemakerChanged = selectMoviemaker?.id !== filmCurr.moviemaker?.id;

        if (
            isGenreChanged || isMoviemakerChanged ||
            filmCurr.name !== name ||
            filmCurr.budget !== budget ||
            img ||
            !isInfoEmpty
        ) {
            setDisabledPutBtn(false);
        } else {
            setDisabledPutBtn(true);
        }
    }, [name, selectMoviemaker, selectGenre, budget, img, info, filmCurr]);

    useEffect(() => {
        fetchOneFilm(id).then(data => {
            setFilmCurr(data);
            setSelectMoviemaker(data.moviemaker);
            setSelectGenre(data.genre);
            setName(data.name);
            setBudget(data.budget);
            setInfo(data.info)
        });
    }, [id]);

    return (
        <Container className="mt-3">
            <Row>
                <Col xs={12}>
                    {/*Brand*/}
                    <Row>
                        <Col xs={2} className="d-flex align-items-center"
                             style={{color:"yellow"}}>
                            Производитель:
                        </Col>
                        <Col xs={10}>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>{selectMoviemaker?.name || "Выберите производителя"}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {film.moviemakers.map((moviemaker) => (
                                        <Dropdown.Item
                                            key={moviemaker.id}
                                            onClick={() => setSelectMoviemaker(moviemaker)}
                                            active={selectMoviemaker?.id === moviemaker.id} // Compare IDs instead of names
                                        >
                                            {moviemaker.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    {/*Type*/}
                    <Row>
                        <Col xs={2} className="d-flex align-items-center"
                             style={{color:"yellow"}}>
                            Жанр:
                        </Col>
                        <Col xs={10}>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>{selectGenre?.name || "Выберите жанр"}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {film.genres.map(genre => {
                                        return genre.name === selectGenre?.name ?
                                            <Dropdown.Item
                                                key={genre.id}
                                                disabled
                                            >
                                                {genre.name}
                                            </Dropdown.Item>
                                            :
                                            <Dropdown.Item
                                                key={genre.id}
                                                onClick={() => setSelectGenre(genre)}
                                            >
                                                {genre.name}
                                            </Dropdown.Item>

                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    {/*Name*/}
                    <Row>
                        <Col xs={1} className="d-flex align-items-center"
                        style={{color:"yellow"}}>
                            Название:
                        </Col>
                        <Col xs={8}>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Col>
                        <Col xs={3} className="d-flex align-items-center">
                            {name.length === 0 && <b style={{color: "red"}}>Пожалуйста введите название фильма...</b>}
                        </Col>
                    </Row>
                    {/*Name*/}
                    <Row className="mt-2">
                        <Col xs={1} className="d-flex align-items-center"
                             style={{color:"yellow"}}>
                            Бюджет:
                        </Col>
                        <Col xs={8}>
                            <Form.Control
                                type="number"
                                value={budget}
                                onChange={e => setBudget(Number(e.target.value))}
                            />
                        </Col>
                        <Col xs={3} className="d-flex align-items-center">
                            {budget === 0 && <b style={{color: "red"}}>Пожалуйста введите новый бюджет фильма</b>}
                        </Col>
                    </Row>



                    <Row className="mt-5">
                        <Col xs={12}>
                            {isDisabledPutBtn ? <Button disabled>Отредактировать</Button> : <Button onClick={putFilm}>Отредактировать</Button>}
                            <Button className="ml-5" variant="outline-danger" onClick={handleShow}>Удалить</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete this film {filmCurr.id}?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="outline-danger" onClick={deleteDevice}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
});

export default FilmEditPage;

