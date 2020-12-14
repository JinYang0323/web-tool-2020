import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { errorMessages } from "../errorMessages";
import { performGetEncyclopedia } from "../services";

const EncyclopediaPage = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [inch, setInch] = useState(true);
    const [lbs, setLbs] = useState(true);
    const [breedInfo, setBreedInfo] = useState({});
    const [vaccineInfo, setVaccineInfo] = useState([]);
    const [selectedVaccine, setSelectedVaccine] = useState("");

    useEffect(() => {
        setIsLoading(true);
        performGetEncyclopedia()
            .then((response) => {
                setBreedInfo(response.breedInfo);
                setVaccineInfo(response.vaccineInfo);
            })
            .finally(() => setIsLoading(false));
    }, []);

    const selectVaccine = (e) => {
        if (selectedVaccine === e.target.innerText) setSelectedVaccine("");
        else setSelectedVaccine(e.target.innerText);
    };

    if (isLoading) return <Loader />;
    return (
        <div className="encyclopedia-page">
            <div className="encyclopedia-breed-info">
                <div className="encyclopedia-section-title">
                    Breed Information
                </div>
                {breedInfo && breedInfo[0] ? (
                    <div className="encyclopedia-section-content">
                        <div className="encyclopedia-breed-name">
                            {breedInfo[0].name}
                        </div>
                        <div className="encyclopedia-breed-info-item">
                            <label>Group:</label>
                            <span>{breedInfo[0]["breed_group"]}</span>
                        </div>
                        <div className="encyclopedia-breed-info-item">
                            <label>Height:</label>
                            {inch ? (
                                <span className="encyclopedia-breed-height-item">
                                    {breedInfo[0].height.imperial} inches
                                </span>
                            ) : (
                                <span className="encyclopedia-breed-height-item">
                                    {breedInfo[0].height.metric} cm
                                </span>
                            )}
                            <button onClick={() => setInch(!inch)}>
                                {inch ? "cm" : "inches"}
                            </button>
                        </div>
                        <div className="encyclopedia-breed-info-item">
                            <label>Weight:</label>
                            {lbs ? (
                                <span className="encyclopedia-breed-weight-item">
                                    {breedInfo[0].weight.imperial} lbs
                                </span>
                            ) : (
                                <span className="encyclopedia-breed-weight-item">
                                    {breedInfo[0].weight.metric} kg
                                </span>
                            )}
                            <button onClick={() => setLbs(!lbs)}>
                                {lbs ? "kg" : "lbs"}
                            </button>
                        </div>
                        <div className="encyclopedia-breed-info-item">
                            <label>Life Expectancy:</label>
                            <span>{breedInfo[0]["life_span"]}</span>
                        </div>
                        <div className="encyclopedia-breed-info-item">
                            <label>Temperament:</label>
                            <span>{breedInfo[0].temperament}</span>
                        </div>
                    </div>
                ) : (
                    <div className="encyclopedia-section-content">
                        Please enter pet info in <a href="/profile">profile</a>{" "}
                        to check breed info
                    </div>
                )}
            </div>
            <div className="encyclopedia-vaccine-info">
                <div className="encyclopedia-section-title">
                    Vaccine Information
                </div>
                <div className="encyclopedia-section-content">
                    <span className="encyclopedia-vaccine-label">
                        Which Shots Do Puppies Need?
                    </span>
                    <ul className="encyclopedia-vaccine-list">
                        {vaccineInfo.vaccineList &&
                            Object.keys(vaccineInfo.vaccineList).map(
                                (vaccine) => (
                                    <li key={vaccine}>
                                        <div
                                            className="encyclopedia-vaccine-item"
                                            onClick={selectVaccine}
                                        >
                                            {vaccine}
                                        </div>
                                        <p>
                                            {vaccine === selectedVaccine &&
                                                vaccineInfo.vaccineList[vaccine]
                                                    .info}
                                        </p>
                                    </li>
                                )
                            )}
                    </ul>
                    <div className="encyclopedia-vaccine-timetable">
                        <span className="encyclopedia-vaccine-label">
                            Puppy Vaccination Schedule
                        </span>
                        <table>
                            <thead>
                                <tr>
                                    <th className="encyclopedia-vaccine-timetable-age">
                                        Puppy’s Age
                                    </th>
                                    <th className="encyclopedia-vaccine-timetable-recommended">
                                        Recommended Vaccinations
                                    </th>
                                    <th className="encyclopedia-vaccine-timetable-optional">
                                        Optional Vaccinations
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {vaccineInfo.vaccineSchedule &&
                                    vaccineInfo.vaccineSchedule.map(
                                        (vaccine, index) => (
                                            <tr key={index}>
                                                <td className="encyclopedia-vaccine-timetable-age">
                                                    {vaccine["Puppy’s Age"]}
                                                </td>
                                                <td className="encyclopedia-vaccine-timetable-recommended">
                                                    {
                                                        vaccine[
                                                            "Recommended Vaccinations"
                                                        ]
                                                    }
                                                </td>
                                                <td className="encyclopedia-vaccine-timetable-optional">
                                                    {
                                                        vaccine[
                                                            "Optional Vaccinations"
                                                        ]
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EncyclopediaPage;
