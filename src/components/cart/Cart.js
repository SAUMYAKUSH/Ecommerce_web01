import React, { useContext, useState, useEffect } from "react";
import CartContext from "../../store/Cart-context";
import { Button, Card } from "react-bootstrap";
import Modal from "../UI/Modal";
import "./Cart.css";
import AuthContext from "../../store/auth-context";

const Cart = (props) => {
  const cartCxt = useContext(CartContext);
  const authCxt = useContext(AuthContext);

  
  const deleteCartHandler = async () => {
    try {
      await cartCxt.deleteItem();
    } catch (error) {
      console.error("Error deleting cart in Cart component:", error);
    }
  };

  let totalAmount = cartCxt.items.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );
  //console.log(cartCxt.items);

  return (
    <>
      <Modal onHideCart={props.onHideCart}>
        {cartCxt.isLoading && <p>Loading cart...</p>}
        {!cartCxt.isLoading && (
          <ul>
            {cartCxt.items.map((item, index) => (
              <li key={index}>
                <Card style={{ width: "18rem" }}>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Img variant="top" src={item.imageUrl} />
                  <Card.Body>
                    <Card.Text>
                      Price:{item.price} Quantity:{item.quantity}x
                      <button onClick={() => cartCxt.updateItem(item.id)}>
                        -
                      </button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </li>
            ))}
            <Card.Text>{totalAmount.toFixed(2)}</Card.Text>
            <Button onClick={deleteCartHandler} variant="danger">
              Delete Cart
            </Button>
            <Button onClick={props.onHideCart} variant="primary">
              Close
            </Button>
          </ul>
        )}
      </Modal>
    </>
  );
};

export default Cart;
