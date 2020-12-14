const { response } = require("express");
const fetch = require("node-fetch");

const getBreeds = () => {
    return Promise.all([
        fetch("https://api.thedogapi.com/v1/breeds", {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        }),
        fetch("https://api.thecatapi.com/v1/breeds", {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        }),
    ])
        .then((responses) =>
            Promise.all(responses.map((response) => response.json()))
        )
        .then((breedsArr) => {
            return {
                dogBreeds: breedsArr[0].map((breed) => breed.name),
                catBreeds: breedsArr[1].map((breed) => breed.name),
            };
        });
};

const getBreedInfo = (breed, type) => {
    if (!breed || !type) return Promise.resolve([]);
    return fetch(`https://api.the${type}api.com/v1/breeds/search?q=${breed}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    }).then((response) => response.json());
};

module.exports = {
    getBreeds,
    getBreedInfo,
};
