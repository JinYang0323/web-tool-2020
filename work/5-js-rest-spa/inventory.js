const userinfo = {};
 
const checkSid = (sid) => {
    return userinfo[sid];
};

const addUser = ({ sid, username }) => {
    console.log("add user name", sid, username)
    userinfo[sid] = { username };
};

const items = {
    0: {
        name: "apple",
        quantity: 0
    },
    1: {
        name: "banana",
        quantity:0
    }
};

const addItem = (name, quantity) => {
    items[items.length] = {name, quantity};
}

const updateItem = (itemid, quantity) => {
    items[itemid].quantity = quantity;
}

const deleteItem = (itemid) => {
    delete items[itemid];
}

module.exports = {
    checkSid,
    addUser,
    items,
    addItem,
    updateItem,
    deleteItem
}