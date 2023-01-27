import React from 'react';

interface AddActorAndProducerForm {
    onAddPerson: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AddActorAndProducer = ({ onAddPerson }: AddActorAndProducerForm) => {
    return (
        <div className="form-container">
            <h2>Add Actor/Producer</h2>

            <form onSubmit={onAddPerson}>
                <div className="input-container">
                    <label>Select Adding person</label>
                    <select className="text-input" name="type" required>
                        <option value={''}>---select person---</option>
                        <option value="actor">Actor</option>
                        <option value="producer">Producer</option>
                    </select>
                </div>
                <div className="input-container">
                    <label>Name</label>
                    <input type={'text'} name="name" required className="text-input" />
                </div>
                <div className="input-container">
                    <label>Gender</label>
                    <select className="text-input" name="gender" required>
                        <option value={''}>---select gender---</option>
                        <option value="male">Male</option>
                        <option value="male">Female</option>
                        <option value="others">others</option>
                    </select>
                </div>
                <div className="input-container">
                    <label>Dob</label>
                    <input type={'date'} name="dob" required className="text-input" />
                </div>
                <div className="input-container">
                    <label>Bio</label>
                    <textarea className="text-area" name="bio" required />
                </div>
                <button className="submit-btn">Add</button>
            </form>
        </div>
    );
};

export default AddActorAndProducer;
