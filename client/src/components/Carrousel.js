import React from 'react';
import rollos from '../assets/images/rollos.jpg';

export const Carrousel = () => {
    return (
    
    <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img src={ rollos } className="d-block w-100" alt="..."></img>
            </div>
        </div>
    </div>
    )
}
