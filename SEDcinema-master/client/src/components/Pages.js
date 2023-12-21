import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";

const Pages = observer(() => {
    const {film} = useContext(Context);
    const pageCount = Math.ceil(film.totalCount / film.limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    return (
        <Pagination className="mt-5" style={{color: "yellow"}}>
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={film.page === page}
                    onClick={() => film.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;
