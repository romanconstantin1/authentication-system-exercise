// Framework realted packages
import React from "react";

export const Private = ({ logoutUser }) => {
  return (
    <>
      <h1>Congratulations! This is the private page</h1>
      <div className="w-100">
        <img
          className="img-fluid"
          alt="some-alt-to-improve-accessibility"
          src="https://hips.hearstapps.com/hmg-prod/images/norwegian-forest-cat-royalty-free-image-990019846-1553192205.jpg"
        />
        <hr />
        <button onClick={logoutUser}>Logout</button>
      </div>
    </>
  );
};
