import React, {useContext} from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import CartContext from "../store/Cart-context";

const productsArr = [
  {
    id: 1,
    title: "Colors",
    price: 100,
    quantity: 1,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
  },
  {
    id: 2,
    title: "Black and white Colors",
    price: 50,
    quantity: 1,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
  },
  {
    id: 3,
    title: "Yellow and Black Colors",
    price: 70,
    quantity: 1,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  },
  {
    id: 4,
    title: "Blue Color",
    price: 100,
    quantity: 1,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
  },
];

const Store = (props) => {

  const cartCxt = useContext(CartContext);

  const addToCartHandler = (data) => {
    cartCxt.addItem(data);
  }

  return (
    <>
      <ul>
        <Container>
          <Row>
            {productsArr.map((item) => (
              <Col key={item.id} md={6} className="mb-5">
                <Card style={{ width: "18rem" }}>
                <Card.Title>{item.title}</Card.Title>
                <Link to={`/Store/${item.id}`}>View Details</Link>
                  <Card.Img variant="top" src={item.imageUrl} />
                  <Card.Body>
                    <Card.Text>{item.price}</Card.Text>
                    <Button onClick={()=> addToCartHandler(item)} variant="primary">Add to Cart</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        <Button onClick={props.onShowCart} style={{marginLeft: '800px'}}variant="primary"> View Cart</Button>
      </ul>

      <Container
        style={{
          display: "flex",
          marginTop: "140px",
          padding: "20px",
          background: "#56CCF2",
        }}
      >
        <h1 className="text-center text-muted">
          Copyright &copy; 2023 The Generics
        </h1>
      </Container>
    </>
  );
};

export default Store;
