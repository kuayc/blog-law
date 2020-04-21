import React, { Component } from "react";
import "./input.css";

export default class Inputs extends Component {
  constructor() {
    super();
    this.state = {
      titleInput: "",
      imageInput: "",
      contentInput: "",
      searchInput: "",
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  resetInputs = () => {
    this.setState({
      titleInput: "",
      imageInput: "",
      contentInput: "",
      searchInput: "",
    });
  };

  setScrollbarTop() {
    window.scrollTo(0, 0);
  }

  render() {
    let { searchInput, titleInput, imageInput, contentInput } = this.state;
    return (
      <div className="inputs-box">
        <link
          href="https://fonts.googleapis.com/css?family=Julius+Sans+One&display=swap"
          rel="stylesheet"
        ></link>
        <div className="title-image">
          <textarea
            className="box1"
            type="textarea"
            value={titleInput}
            onChange={this.handleChange}
            placeholder="Title"
            name="titleInput"
          ></textarea>
          <textarea
            className="box2"
            value={this.state.imageInput}
            onChange={this.handleChange}
            placeholder="Image"
            name="imageInput"
          ></textarea>
          <div className="top-stickybox">
            <button onClick={() => this.setScrollbarTop()} className="top">
              Top
            </button>
          </div>
        </div>
        <div className="content-post">
          <div className="content-input-box">
            <textarea
              className="content-input"
              value={this.state.contentInput}
              onChange={this.handleChange}
              placeholder="Content"
              name="contentInput"
            ></textarea>
          </div>
        </div>
        <div className="button-container">
          <div className="post-reset">
            <button
              className="post-button"
              onClick={(event) => {
                if (event) {
                  this.props.createPost(titleInput, imageInput, contentInput);
                }

                if (event) {
                  this.resetInputs(titleInput, imageInput, contentInput);
                }
              }}
            >
              Post
            </button>

            <button
              className="reset-button"
              onClick={() =>
                this.resetInputs(titleInput, imageInput, contentInput)
              }
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    );
  }
}
