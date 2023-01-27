import React from 'react';
import './movieCard.css';
import { BsTrash } from 'react-icons/bs';

interface movieCard {
    item: {
        name: string;
        poster: string;
        actors: {}[];
        producer: {
            name: string;
        };
        plot: string;
        _id: string;
        year_of_release: string;
    };
    onDeleteMovie: (id: string) => void;
}

const MovieCard = ({ item, onDeleteMovie }: movieCard) => {
    return (
        <div key={item._id} className="movie-card">
            <img src={item.poster} alt={item.name} className="movie-poster" />
            <div className="movie-info">
                <h3>{item.name}</h3>
                <p className="release-date">{new Date(item.year_of_release).toLocaleDateString()}</p>
                <p className="plot">{item.plot}</p>
                <div className="cast">
                    <h5>Actors</h5>
                    <div className="actors-container">
                        {item.actors.map((i: any) => (
                            <p key={i._id} className="actor-name">
                                {i.name}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="cast">
                    <h5>producer</h5>
                    <div className="actors-container">{item?.producer?.name}</div>
                </div>
            </div>
            {/* <div className="edit-icon" onClick={() => onEditMovie(item)}>
                    <GrEdit />
            </div> */}
            <div className="delete-icon" onClick={() => onDeleteMovie(item._id)}>
                <BsTrash />
            </div>
        </div>
    );
};

export default MovieCard;
