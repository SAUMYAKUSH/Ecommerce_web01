import React, { useState, useContext, useEffect } from "react";
import CartContext from "./Cart-context";
//import axios from "axios";
import AuthContext from "./auth-context";

const CartProvider = (props) => {
  const [items, setItems] = useState([]);
  const authCxt = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchCartItems = async () => {
      try {
        const userEmail = authCxt.userEmail;
        const response = await fetch(
          `https://restaurant-8d5d4-default-rtdb.firebaseio.com/cart/test1testcom.json`
        );
        if (!response.ok) {
          let errorMessage = await response.json();
          throw new Error(errorMessage);
        }
        const data = await response.json();
        //console.log(data);
        let cartItems = [];
        for (let key in data) {
          cartItems.push({
            id: key,
            ...data[key],
          });
        }
        setItems(cartItems);
        //console.log(cartItems);
        setIsLoading(false);
      } catch (error) {
        console.log("failed to fetch data", error);
      }
    };
    if (authCxt.isLoggedIn) {
      fetchCartItems();
    } else {
      setIsLoading(false);
    }
  }, [authCxt.isLoggedIn]);

  const addItemToCartHandler = async (gotData) => {
    try {
      //console.log(gotData);
      const userEmail = authCxt.userEmail;
      const response = await fetch(
        `https://restaurant-8d5d4-default-rtdb.firebaseio.com/cart/test1testcom.json`,
        {
          method: "POST",
          body: JSON.stringify(gotData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        let errorMessage = await response.json();
        throw new Error(errorMessage);
      }
      //const responseData = await response.json();//response mila jo gotData ka usko json me responseData me rakhe pr response me data missing tha to hmne response me rely ni kiya got Data hi use kiya niche bhi
      //console.log("responseData:", responseData);
      setItems((prevData) => {
        let existItem = prevData.find((item) => item.id === gotData.id);
        if (existItem) {
          return prevData.map((item) =>
            item.id === gotData.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevData, gotData];
        }
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
    console.log(items);
  };

  const removeItemToCartHandler = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItemToCartHandler = (id) => {
    setItems((prevItems) => {
      const updateItems = prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      return updateItems.filter((item) => item.quantity > 0);
    });
  };

  const deleteCartHandler = async () => {
    try {
      const response = await fetch(
        `https://restaurant-8d5d4-default-rtdb.firebaseio.com/cart/test1testcom.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        let err = await response.json();
        throw new Error(err);
      }
      setItems([]);
    } catch (error) {
      alert("failed To Delete!!");
      console.log(error);
    }
  };

  const cartContext = {
    items: items,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    updateItem: updateItemToCartHandler,
    deleteItem: deleteCartHandler,
    isLoading: isLoading,
  };

  return (
    <>
      <CartContext.Provider value={cartContext}>
        {props.children}
      </CartContext.Provider>
    </>
  );
};

export default CartProvider;
