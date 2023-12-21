import {Button, Nav} from "react-bootstrap";
import React, {useContext} from "react";
import {Context} from "../../../index";
import {useNavigate} from "react-router-dom";

import AdminPanel from "../AdminPanel";

const TrueAuth = () => {
    const {user, watchlist} = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
        watchlist.resetWatchlist();
    }

    return (
        <Nav className="ml-auto" style={{color: "white"}}>

            <Button
                variant={"outline-warning"}
                onClick={() => logOut()}
            >
                Выйти
            </Button>

            <AdminPanel/>
        </Nav>
    );
};

export default TrueAuth;
