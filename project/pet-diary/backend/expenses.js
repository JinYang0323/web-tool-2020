const uuid = require("uuid").v4;

const expenses = {
    test: {
        "2020-12-20": {
            "b5478d2c-a8fc-4e04-b63d-ab74efc55e0b": {
                date: "2020-12-20",
                cost: 200,
                category: "Health",
                notes: "health insurance",
            },
            "b5478d2c-a8fc-4e84-b63d-ab74efc55e0b": {
                date: "2020-12-20",
                cost: 300,
                category: "Health",
                notes: "exam fee",
            },
        },
        "2020-10-08": {
            "f112ee61-2085-41cd-9cd0-ed228b2ece2d": {
                date: "2020-09-08",
                cost: 20,
                category: "Toy",
                notes: "Balls",
            },
        },
        "2020-09-08": {
            "f112ee61-2085-41cd-9cd0-ed228b2ece2d": {
                date: "2020-09-08",
                cost: 3000,
                category: "Food",
                notes: "Royal Caynn",
            },
        },
    },
};

const getExpenses = (username) => {
    if (!expenses[username]) {
        expenses[username] = {};
    }
    return expenses[username];
};

const addExpenses = (username, date, cost, category, notes) => {
    const expenseId = uuid();
    expenses[username] = expenses[username] || {};
    expenses[username][date] = expenses[username][date] || {};
    expenses[username][date][expenseId] = { date, cost, category, notes };
    return expenses[username];
};

module.exports = {
    getExpenses,
    addExpenses,
};
