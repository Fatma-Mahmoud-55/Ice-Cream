import React from 'react'
import './notFoundStyle.css'
import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        < >
            <div className='NotFoundPage'>
                <div className="notFound">
                    <h1 className="error">404</h1>
                    <br />
                    <div className="notFoundPage">Ooops!!! The page you are looking for is not found</div>
                    <br />
                    <br />
                    <Link to={"home"} className="back-home" >
                        Back to home
                    </Link>
                </div>
            </div>
        </>
    )
}
