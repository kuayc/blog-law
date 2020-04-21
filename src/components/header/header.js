import React from "react";
import "./header.css";

const Header = (props) => (
  <div className="sticky-box">
    <link
      href="https://fonts.googleapis.com/css?family=Julius+Sans+One&display=swap"
      rel="stylesheet"
    ></link>
    <header className="header">
      <img
        alt="image"
        className="logo"
        src="https://images.unsplash.com/photo-1496154704336-6c88a94a019a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
      ></img>
      <div className="title-box">
        <text className="main-title">Lawyering is hard</text>
      </div>
      {props.passwordFlip && (
        <input
          className="admin-pass-input"
          name="password"
          type="password"
          value={props.password}
          placeholder="password"
        />
      )}
      <button className="admin-btn" onClick={() => props.navigate()}>
        {props.passwordFlip ? "Sumbit" : props.changeBtnName()}
      </button>
    </header>
  </div>
);

export default Header;
