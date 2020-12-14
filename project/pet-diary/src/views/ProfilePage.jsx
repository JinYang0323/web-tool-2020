import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { errorMessages } from "../errorMessages";
import { performGetProfile } from "../services";
import { performUpdateProfile } from "../services";

const ProfilePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [breed, setBreed] = useState("");
    const [breeds, setBreeds] = useState([]);
    const [gender, setGender] = useState("");
    const [weight, setWeight] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [status, setStatus] = useState("");

    useEffect(() => {
        setIsLoading(true);
        performGetProfile()
            .then((response) => {
                const { name, type, breed, gender, weight } = response.profile;
                setName(name);
                setType(type);
                setBreed(breed);
                setBreeds(response.breeds);
                setGender(gender);
                setWeight(weight);
            })
            .finally(() => setIsLoading(false));
    }, []);

    const onChange = (e, type) => {
        setStatus("");
        if (type === "name") {
            setName(e.target.value);
        } else if (type === "type") {
            setType(e.target.value);
        } else if (type === "breed") {
            setBreed(e.target.value);
        } else if (type === "gender") {
            setGender(e.target.value);
        } else if (type === "weight") {
            setWeight(e.target.value);
        }
    };

    const onUpdate = () => {
        if (!isUpdating) {
            setIsUpdating(true);
            return;
        }
        if (!name || !type || !breed || !gender) {
            setStatus(errorMessages["field-required"]);
            return;
        }
        setIsPending(true);
        performUpdateProfile({ name, type, breed, gender, weight })
            .catch((err) => setStatus(err))
            .finally(() => {
                setIsPending(false);
                setIsUpdating(false);
            });
    };
    if (isLoading) return <Loader />;
    return (
        <div className="profile-page">
            <div className="profile-basic">
                <button onClick={onUpdate}>update</button>
                <div className="profile-info-item">
                    <label>*Name:</label>
                    {isUpdating || name === "" ? (
                        <input
                            onChange={(e) => onChange(e, "name")}
                            value={name}
                            disabled={isPending}
                        />
                    ) : (
                        <span>{name}</span>
                    )}
                </div>
                <div className="profile-info-item">
                    <label>*Type:</label>
                    {isUpdating || name === "" ? (
                        <select
                            id="type"
                            name="type"
                            onChange={(e) => onChange(e, "type")}
                            value={type}
                            disabled={isPending}
                        >
                            <option>...</option>
                            <option value="dog">dog</option>
                            <option value="cat">cat</option>
                        </select>
                    ) : (
                        <span>{type}</span>
                    )}
                </div>
                <div className="profile-info-item">
                    <label>*Breed:</label>
                    {isUpdating || name === "" ? (
                        <select
                            id="breed"
                            name="breed"
                            onChange={(e) => onChange(e, "breed")}
                            value={breed}
                            disabled={isPending}
                        >
                            <option>...</option>
                            {type === "dog"
                                ? breeds.dogBreeds.map((breed) => (
                                      <option key={breed} value={breed}>
                                          {breed}
                                      </option>
                                  ))
                                : null}
                            {type === "cat"
                                ? breeds.catBreeds.map((breed) => (
                                      <option key={breed} value={breed}>
                                          {breed}
                                      </option>
                                  ))
                                : null}
                        </select>
                    ) : (
                        <span>{breed}</span>
                    )}
                </div>
                <div className="profile-info-item">
                    <label>*Gender:</label>
                    {isUpdating || name === "" ? (
                        <select
                            id="gender"
                            name="gender"
                            onChange={(e) => onChange(e, "gender")}
                            value={gender}
                            disabled={isPending}
                        >
                            <option>...</option>
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </select>
                    ) : (
                        <span>{gender}</span>
                    )}
                </div>
                <div className="profile-info-item">
                    <label>Weight:</label>
                    {isUpdating || name === "" ? (
                        <input
                            type="number"
                            onChange={(e) => onChange(e, "weight")}
                            value={weight}
                            disabled={isPending}
                        />
                    ) : (
                        <span>{weight}</span>
                    )}
                    {" lbs"}
                </div>

                {status && <div className="error-panel">{status}</div>}
            </div>
        </div>
    );
};

export default ProfilePage;
