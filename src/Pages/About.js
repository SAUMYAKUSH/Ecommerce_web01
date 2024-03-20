import React from "react";
import { Container } from "react-bootstrap";

const About = () => {
  return (
    <>
      <Container>
        <h3>About</h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. At facilis
          reiciendis quod, quis dicta eaque quibusdam enim? Repellendus,
          recusandae, minus nostrum voluptas consectetur tempora, dignissimos
          non sapiente ullam sed enim! Architecto hic distinctio consectetur
          rem, autem vel fugiat at tempore eveniet magnam vitae rerum ea neque
          sequi cupiditate aperiam incidunt assumenda quo quia. Tempora ipsa
          enim, recusandae libero ratione aperiam magnam consequatur nostrum
          fugiat harum eius nulla similique adipisci exercitationem.
          Exercitationem eaque, nam sapiente eligendi minima quae ad consequatur
          amet magni provident reiciendis aperiam repellendus inventore corrupti
          expedita aut, totam, modi porro tempora! Inventore, illo similique
          fugiat voluptatibus error et atque asperiores hic assumenda aspernatur
          temporibus qui obcaecati quidem iure ipsam cum saepe explicabo esse.
          Doloribus nihil explicabo architecto cumque? Ea ipsam est inventore ad
          sed? Officiis nihil laudantium, consectetur delectus dignissimos ea
          tempore aut molestias eligendi, aperiam nesciunt soluta distinctio
          blanditiis ducimus? Ipsam ab aperiam et. Delectus debitis suscipit
          inventore est voluptas nesciunt. Quam vero hic eveniet impedit et,
          atque fugit praesentium quas ipsa eum ut recusandae error a aliquam
          facere non, optio aperiam, unde blanditiis placeat sit? A deserunt
          veritatis esse laboriosam quibusdam, tenetur excepturi at illo quasi.
          Nobis delectus enim accusamus quisquam a, quibusdam cupiditate ipsam
          dolor.
        </p>
      </Container>

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

export default About;
