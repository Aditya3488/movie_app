import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Nvabar extends Component {
  render() {
    return (
      <div
        style={{ display: "flex", padding: "0.5rem", background: "#603CB5" }}
      >
        <Link to='/' style={{textDecoration:'none'}} >
          <h1 style={{ cursor: "pointer", color: "white" }}>
            Movie Application
          </h1>
        </Link>
        <Link to='/favourites' style={{textDecoration:'none'}}>
          <h2
            style={{
              marginLeft: "2rem",
              marginTop: "0.2rem",
              cursor: "pointer",
              color: "white",
            }}
          >
            Favorites
          </h2>
        </Link>
      </div>
    );
  }
}
