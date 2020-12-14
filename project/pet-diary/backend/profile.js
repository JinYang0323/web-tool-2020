const profiles = {
    test: {
        name: "Sushi",
        type: "dog",
        breed: "Yorkshire Terrier",
        gender: "female",
        weight: 3,
    },
};

const getProfile = (username) => {
    if (!profiles[username])
        profiles[username] = {
            name: "",
            type: "",
            breed: "",
            gender: "",
            weight: "",
        };
    return profiles[username];
};

const updateProfile = ({ username, name, type, breed, gender, weight }) => {
    profiles[username] = { name, type, breed, gender, weight };
};

module.exports = {
    getProfile,
    updateProfile,
};
