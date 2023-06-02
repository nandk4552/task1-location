import React from "react";

const InstagramVideo = ({ url }) => {
  console.log(url);
  return (
    <div className="instagram-video">
       <iframe
        title="Instagram Video"
        src={url}
        width="100%"
        height="300"
        allowFullScreen
      /> 
   
    </div>
  );
};

export default InstagramVideo;
