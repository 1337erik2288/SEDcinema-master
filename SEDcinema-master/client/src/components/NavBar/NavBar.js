import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";

import {Context} from "../../index";

import {Container, Navbar} from "react-bootstrap";
import {CINEMA_ROUTE} from "../../utils/consts";
import TrueAuth from "./preesent-components/trueAuth";
import FalseAuth from "./preesent-components/falseAuth";

const NavBar = observer(() => {
    const {user} = useContext(Context);

    return (
        <Navbar bg="dark" variant="warning">
            <Container>
                <NavLink style={{color: "yellow"}} to={CINEMA_ROUTE}>Кинопоиск</NavLink>
                {user.isAuth ? <TrueAuth/> : <FalseAuth/>}
            </Container>
        </Navbar>
    );
});

export default NavBar;
