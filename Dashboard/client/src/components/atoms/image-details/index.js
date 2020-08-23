import React, { useState, useEffect, useRef } from 'react';
import { useStyles } from './styles';

const ImageDetails = ({ source }) => {
  const classes = useStyles();
  const [sizes, setSizes] = useState('');
  const imageRef = useRef();

  const onImageLoaded = () => {
    setSizes(
      `${imageRef.current.naturalWidth}x${imageRef.current.naturalHeight}`
    );
  };

  useEffect(() => {
    const imgElCurrent = imageRef.current;

    if (imgElCurrent) {
      imgElCurrent.addEventListener('load', onImageLoaded);
      return () => imgElCurrent.removeEventListener('load', onImageLoaded);
    }
  }, [imageRef]);

  return (
    <div className={classes.details}>
      <img src={source} ref={imageRef} alt="missing" />
      <div>{sizes}</div>
    </div>
  );
};

export default ImageDetails;
