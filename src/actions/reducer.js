var Map = require("immutable").Map;

var reducer = function(state = Map(), action) {
    switch (action.type) {
        case "SET_STATE":
            //return Object.assign({},state,{items:action.state})
            return state.merge(action.state);
        case "ADD_ITEM":
            console.log(action);
            return state.update("items", (items) => items.push(action.item));
        case "DELETE_ITEM":
            return state.update("items",
                (items) => items.filterNot(
                    (item) => item === action.item
                )
            );
    }
    return state;
}
module.exports = reducer;