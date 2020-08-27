import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import Chart from './Chart';

const Container = styled.div`
  text-align: center;
`;
const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  margin: auto;
  border-bottom: 2px solid #7c88ef;
  box-sizing: border-box;
  @media(min-width: 768px) {
    flex-direction: row;
    widht: 80%;
  }
`;
const Col = styled.div`
  width: 100%;
  text-align: center;
  img, p {
    display: inline-block;
    vertical-align: middle;
  }
  @media(min-width: 768px) {
    width: 20%;
  }
`;

const Day = ({ data }) => {
  return (
    <Container>
      <Link to="/">
        <span>&#60;&#60;</span>
        {' '}
        Regresar
      </Link>
      {data && data.length > 0 && (
        <Row>
          <Col>
            <h2>Santiago, Chile</h2>
            <img
              src={`https://openweathermap.org/img/wn/${data[0].weather[0].icon}.png`}
              alt={`ícono descriptivo del tiempo ${data[0].weather[0].description}`}
            />
            <h3>{data[0].weather[0].description.toUpperCase()}</h3>
          </Col>
          <Col>
            <h3>Temperatura promedio</h3>
            <Chart data={data} width={400} height={300} />
          </Col>
        </Row>
      )}
      {data && data.length > 0 && data.map((i) => (
        <Row key={i.dt}>
          <Col>
            <h3>Hora</h3>
            <p>{i.dt_txt}</p>
          </Col>
          <Col>
            <h3>Temperatura max/min</h3>
            <div>
              <img
                src={`https://openweathermap.org/img/wn/${i.weather[0].icon}.png`}
                alt={`ícono descriptivo del tiempo ${i.weather[0].description}`}
                />
              <p>{i.main.temp_min}/{i.main.temp_max}°C</p>
            </div>
          </Col>
          <Col>
            <h3>Descripción</h3>
            <p>{i.weather[0].description}</p>
          </Col>
          <Col>
            <h3>Humedad</h3>
            <p>{i.main.humidity}</p>
          </Col>
          <Col>
            <h3>Viento</h3>
            <p>{i.wind.speed}</p>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

Day.propTypes = {
  data: PropTypes.array,
};

Day.defaultProps = {
  data: [],
};

export default Day;
