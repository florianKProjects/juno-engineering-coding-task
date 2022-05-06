import React, { useEffect, useState } from "react";
import { fetchImageUrls } from "../api/index";
import CircularProgress from "@mui/material/CircularProgress";
import ImagesCarouselCard from "./ImagesCarouselCard";

const imagesInitialState = {
  imageUrls: [],
  isLoading: true,
  error: null,
};

const ImageCarousel = (props) => {
  // use first state
  const [imagesState, setimagesState] = React.useState(imagesInitialState);

  useEffect(() => {
    //fatch images
    fetchImageUrls()
      .then((data) => {
        setimagesState({ imageUrls: data, isLoading: false, error: null });
      })
      .catch((err) => {
        setimagesState({ imageUrls: [], isLoading: false, error: err });
      });
  }, []);

  const showImagesCarousel = () => {
    if (imagesState.error) {
      return <p>{imagesState.error}</p>;
    }
    return <ImagesCarouselCard images={imagesState.imageUrls} />;
  };
  return (
    <div className="carousel-boy">
      {imagesState.isLoading ? <CircularProgress /> : showImagesCarousel()}
    </div>
  );
};
export default ImageCarousel;
