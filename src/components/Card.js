import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  border: 2px solid #7c88ef;
  text-align: center;
`;

const Card = ({ data, day }) => {
  const lowerTemp = Math.round(
    data.reduce((accum, current) => accum + current.main.temp_min, 0) /
      data.length
  );
  const higherTemp = Math.round(
    data.reduce((accum, current) => accum + current.main.temp_max, 0) /
      data.length
  );

  return data && data.length > 0 ? (
    <Container>
      <img
        src={`https://openweathermap.org/img/wn/${data[0].weather[0].icon}.png`}
        alt={`ícono descriptivo del tiempo ${data[0].weather[0].description}`}
      />
      <p>{data[0].weather[0].description.toUpperCase()}</p>
      <p>Temp. mínima: {lowerTemp}°C</p>
      <p>Temp. máxima: {higherTemp}°C</p>
      <p>{day.toUpperCase()}</p>
    </Container>
  ) : null;
};

Card.propTypes = {
  data: PropTypes.array.isRequired,
  day: PropTypes.string.isRequired,
};

export default Card;
