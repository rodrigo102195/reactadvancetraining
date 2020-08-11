import React from "react";
import { Segment, Image } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { getPhotos } from "../../constants/getters";
import _ from "loadsh";
import "./PhotoGallery.css";

const PhotoGallery = () => {
  const defaultImage =
    "https://react.semantic-ui.com/images/wireframe/image.png";
  const photos = useSelector(getPhotos);

  return (
    <div className="photoGallery">
      {photos.length > 0
        ? photos.map((photo) => (
            <Segment>
              <Image height="300px" src={photo.download_url} />
            </Segment>
          ))
        : _.times(20, () => (
            <Segment>
              <Image size="medium" src={defaultImage} />
            </Segment>
          ))}
    </div>
  );
};

export default PhotoGallery;
