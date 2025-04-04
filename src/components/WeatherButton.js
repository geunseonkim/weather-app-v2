import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = () => {
  return (
    <div>
      <Button variant="dark">Current Location</Button>
      <Button variant="dark">Wellington</Button>
      <Button variant="dark">Sydney</Button>
    </div>
  );
};

export default WeatherButton;
