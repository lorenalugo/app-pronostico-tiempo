import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import Card from "./Card";

const Container = styled.div`
  box-sizing: border-box;  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  min-height: 100vh;
  a {
    display: block;
    width: 100%;
    text-decoration: none;
    color: #000;
  }
  @media(min-width: 768px) {
    flex-direction: row;
    a {
      width: 20%;
    }
  }
`;

const Main = ({ data, days }) => {
  return (
  <Container>
    <h1>Pronóstico para los próximos 5 días, Santiago Chile</h1>
    {data.length > 0 ? data.map((d, index) => (
      <Link to={`/${days[index].name}`} key={index}>
        <Card data={d} day={days[index].name} />
      </Link>
    )) : null}
  </Container>
  );
}

Main.propTypes = {
  data: PropTypes.array.isRequired,
  days: PropTypes.array.isRequired,
};

export default Main;
