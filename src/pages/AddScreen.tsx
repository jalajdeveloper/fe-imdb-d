import React, { useState, useEffect } from 'react';
import './styles/addScreen.css';
import AddMovie from '../components/forms/AddMovie';
import AddActorAndProducer from '../components/forms/AddActorAndProducer';
import { Link } from 'react-router-dom';
import { fetchActors, fetchProducers, addActorAndProducer } from '../redux/slices/actorAndProducerSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import { addMovie } from '../redux/slices/moviesSlice';

let bool = false;

const AddScreen = () => {
    const dispatch = useAppDispatch();
    const [selectedActors, setSelectedActors] = useState<string[]>([]);
    const { actors, producer } = useAppSelector((state: any) => state.actorsAndProducers.data);
    const { status } = useAppSelector((state: any) => state.actorsAndProducers);
    useEffect(() => {
        if (!bool) {
            bool = true;
            dispatch(fetchActors());
            dispatch(fetchProducers());
        }
    }, [dispatch]);

    const onAddMovie = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newForm = new FormData(e.currentTarget);
        const formData = Object.fromEntries(newForm);
        let isError = false;

        Object.entries(formData).forEach(([key, val], idx) => {
            if (typeof val === 'string' && val?.trim().length === 0) {
                alert(`${key} is required!`);
                isError = true;
            }
        });
        if (isError) return;

        const { poster, name, plot, producer, year_of_release } = formData;

        let filteredActors = selectedActors.map((i) => i.split('-')[0]);
        let filteredproducer = [String(producer).split('-')[0]];
        const newFormData = new FormData();
        newFormData.append('poster', poster);
        newFormData.append('name', name);
        newFormData.append('plot', plot);
        newFormData.append('actors', JSON.stringify(filteredActors));
        newFormData.append('year_of_release', year_of_release);
        newFormData.append('producer', JSON.stringify(filteredproducer));

        dispatch(addMovie(newFormData));
    };

    const onChangeActor = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let actor = e.target.value;

        if (e.target.value.trim().length === 0) return;

        if (selectedActors.includes(actor)) {
            alert('Actor already selected');
            return;
        }

        setSelectedActors([...selectedActors, actor]);
    };

    const onRemoveActor = (id: number) => {
        let filteredActors = selectedActors.filter((i, idx) => idx !== id);

        setSelectedActors(filteredActors);
    };

    const onAddPerson = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.currentTarget));

        let bool = false;
        Object.entries(formData).forEach(([key, val], idx) => {
            if (typeof val === 'string' && val?.trim().length === 0) {
                alert(`${key} is required!`);
                bool = true;
            }
        });
        if (bool) return;
        const { type, ...data } = formData;

        dispatch(addActorAndProducer({ type, data })).then(() => {
            if (type === 'actor') {
                dispatch(fetchActors());
            } else if (type === 'producer') {
                dispatch(fetchProducers());
            } else {
                return;
            }
        });
    };

    return (
        <div className="add-main">
            <Link to={'/'} className="go-back">
                Go back
            </Link>
            <div className="forms-container">
                <AddMovie onAddMovie={onAddMovie} producer={producer} actors={actors} onChangeActor={onChangeActor} selectedActors={selectedActors} onRemoveActor={onRemoveActor} />
                <AddActorAndProducer onAddPerson={onAddPerson} />
            </div>
            {status === 'loading' && <div>loading...</div>}
        </div>
    );
};

export default AddScreen;
