import './Footbar.css';
import React from 'react';
import {observer} from "mobx-react-lite";

const Footbar = observer(() => {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <h6>ERICinema</h6>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <p className="copyright-text">Copyright &copy; all rights reserved in 2023 by EricSokolovCinema</p>
                    </div>
                </div>
            </div>
        </footer>
    )
});
export default Footbar;


