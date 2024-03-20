import React from "react";

const CartContext = React.createContext({
    items: [],
    addItem: (data) => {},
    removeItem: (id) => {},
    updateItem: (id) => {},
    deleteItem: () => {},
})

export default CartContext;