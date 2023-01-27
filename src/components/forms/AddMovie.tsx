import React from 'react';

interface addMovieForm {
    onAddMovie: (e: React.FormEvent<HTMLFormElement>) => void;
    producer?: {}[] | [];
    actors?: {}[] | [];
    onChangeActor: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    selectedActors: string[];
    onRemoveActor: (idx: number) => void;
}

const AddMovie = ({ onAddMovie, producer, actors, onChangeActor, selectedActors, onRemoveActor }: addMovieForm) => {
    return (
        <div className="form-container">
            <h2>Add Movie</h2>
            <form onSubmit={onAddMovie}>
                <div className="input-container">
                    <label>Movie name</label>
                    <input type={'text'} name="name" required className="text-input" />
                </div>
                <div className="input-container">
                    <label>Year of release</label>
                    <input type={'date'} name="year_of_release" required className="text-input" />
                </div>
                <div className="input-container">
                    <label>Plot</label>
                    <textarea className="text-area" name="plot" required />
                </div>
                <div className="input-container">
                    <label>Poster</label>
                    <input type={'file'} required name="poster" />
                </div>
                <div className="input-container">
                    <label>Select Producer</label>
                    <select className="text-input" name="producer" required>
                        <option value={''}>---Select producer---</option>
                        {producer &&
                            producer.length &&
                            producer?.length &&
                            producer?.map((item: any) => (
                                <option value={`${item._id}-${item.name}`} key={item._id}>
                                    {item.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="input-container selected-actors-list">
                    <label>Select Actor</label>
                    <select className="text-input" onChange={onChangeActor} name="actors" required>
                        <option value={''}>---Select Actors---</option>
                        {actors &&
                            actors.length &&
                            actors?.length &&
                            actors?.map((item: any) => (
                                <option value={`${item._id}-${item.name}`} key={item._id}>
                                    {item.name}
                                </option>
                            ))}
                    </select>
                    <div className="selected-actors-list-container">
                        {selectedActors.length
                            ? selectedActors.map((item: any, index: number) => (
                                  <div key={index} className="selected-actor">
                                      <p> {item.split('-')[1]}</p>
                                      <p className="remove-selected-actor-icon" onClick={() => onRemoveActor(index)}>
                                          x
                                      </p>
                                  </div>
                              ))
                            : null}
                    </div>
                </div>
                <button className="submit-btn">Add</button>
            </form>
        </div>
    );
};

export default AddMovie;
