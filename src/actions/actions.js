var addItem = function (item) {
    return {
        type: "ADD_ITEM",
        item
    }
};
var removeItem = function (item) {
    return {
        type: "REMOVE_ITEM",
        item
    }
};

var deleteItem = function (item) {
    return {
        type: "DELETE_ITEM",
        item
    }
};

module.exports = {addItem, removeItem, deleteItem};
