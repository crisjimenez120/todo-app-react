import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          style={{ fontSize: "24px", margin: "1vw" }}
          onClick={() => onRouteChange("signout")}
        >
          Sign Out
        </button>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          style={{ fontSize: "24px", margin: "1vw" }}
          onClick={() => onRouteChange("signin")}
        >
          Login
        </button>
        <button
          style={{ fontSize: "24px", margin: "1vw" }}
          onClick={() => onRouteChange("register")}
        >
          Register
        </button>
      </nav>
    );
  }
};

export default Navigation;
