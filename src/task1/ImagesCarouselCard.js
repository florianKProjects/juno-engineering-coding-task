import React, { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CircularProgress from "@mui/material/CircularProgress";

const ImagesCarouselCard = (props) => {
  const [index, setIndex] = useState(0); // image index in arry
  const [load, setLoad] = useState(false); //loading status

  const NextImage = () => {
    setLoad(true);
    setIndex((index) => (index === props.images.length - 1 ? 0 : index + 1));
  };
  const PervImage = () => {
    setLoad(true);
    setIndex((index) => (index === 0 ? props.images.length - 1 : index - 1));
  };

  return (
    <div className="carousel">
      <div
        className="load-progress"
        style={{ display: load ? "block" : "none" }}
      >
        <CircularProgress />
      </div>

      <div style={{ display: !load ? "block" : "none", display: "flex" }}>
        <ArrowBackIosIcon
          className="left-arrow"
          onClick={NextImage}
        ></ArrowBackIosIcon>
        <img
          src={props.images[index]}
          alt=""
          className="image"
          onLoad={() => setLoad(false)}
        ></img>
        <ArrowForwardIosIcon
          className="right-arrow"
          onClick={PervImage}
        ></ArrowForwardIosIcon>
      </div>
    </div>
  );
};
export default ImagesCarouselCard;
