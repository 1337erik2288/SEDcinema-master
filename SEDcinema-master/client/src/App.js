import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";

import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import Footbar from "./components/Footbar";
import {Container, Spinner} from "react-bootstrap";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {getFilmFromWatchlist} from "./http/filmAPI";
import "./bgstyle.css"

const App = observer(() => {
    const {user, watchlist} = useContext(Context);
    const [loading, setLoading] = useState(false);

    //check authorization
    useEffect(() => {
        if(localStorage.getItem('token')) {
            setLoading(true);
            check().then(data => {
                user.setUser(data);
                user.setIsAuth(true);
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [user]);


    //Loading Watchlist
    useEffect(() => {
       if(user.isAuth === false) {
           watchlist.setDeleteAllFilmFromWatchlist();
           const savedWatchlist = JSON.parse(localStorage.getItem("watchlist"));
           for (let key in savedWatchlist) {
               watchlist.setWatchlist(savedWatchlist[key]);
           }
       } else if(user.isAuth === true){
           watchlist.setDeleteAllFilmFromWatchlist();
           getFilmFromWatchlist().then(data => {
               for (let key in data) {
                   watchlist.setWatchlist(data[key], true);
               }
           })
       }
    }, [watchlist, user.isAuth]);

    if(loading) {
        return <Spinner animation="grow"/>
    }

    return (
        <BrowserRouter>
            <NavBar/>
            <Container className="bgstyle">
                <AppRouter/>
            </Container>
            <Footbar/>
        </BrowserRouter>
    );
});
export default App;
