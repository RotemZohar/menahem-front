import React from "react";
import loadingSrc from "../../assets/loading4.gif";

function Loader() {
  return (
    <div style={{ marginTop: "15%" }}>
      <img src={loadingSrc} alt="Loading" />
    </div>
  );
}

export default Loader;
