import React, { useEffect } from 'react';
// import { GrEdit } from 'react-icons/gr';
import { FaChevronRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import MovieCard from '../components/movieCard/MovieCard';
import { deleteMovie, fetchMovies } from '../redux/slices/moviesSlice';
import { AppDispatch } from '../redux/store';
import './styles/movieList.css';

export const MovieList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { movies, status } = useSelector((state: any) => state.movies);

    useEffect(() => {
        dispatch(fetchMovies());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onDeleteMovie = (id: string) => {
        dispatch(deleteMovie(id)).then(() => {
            dispatch(fetchMovies());
        });
    };

    if (status === 'loading') return <div>loading...</div>;

    return (
        <div className="main">
            <div className="menu">
                <h2 className="movies-head">
                    Movies <FaChevronRight className="forward-icon" />
                </h2>
                <Link to={'/add'} type="button" className="add-movie-btn">
                    Add Movie
                </Link>
            </div>
            <p className="sub-head">Recently Added Movies</p>
            <div className="movies-container">
                {movies && movies.length ? movies?.map((item: any) => <MovieCard item={item} key={item._id} onDeleteMovie={onDeleteMovie} />) : <h4>No movies available</h4>}
            </div>
        </div>
    );
};
