import React, { Component } from "react";
import "./Posts.css";

class posts extends Component {
  constructor(props) {
    super();
    this.state = {
      title: props.post.title,
      image: props.post.image,
      content: props.post.content,
      editing: false,
    };
  }

  flipEditing = () => {
    this.setState({ editing: !this.state.editing });
  };

  SaveEditing = () => {
    this.flipEditing();
    this.props.editPost(
      this.state.title,
      this.state.image,
      this.state.content,
      this.props.post.id
    );
  };

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    let { post } = this.props;
    let { editing, title, image, content } = this.state;
    return (
      <div className="flex-container">
        <link
          href="https://fonts.googleapis.com/css?family=Julius+Sans+One&display=swap"
          rel="stylesheet"
        ></link>

        <p className="title">{post.title}</p>
        <div className="image-content">
          <div className="image-container">
            <img src={post.image} className="post-image" alt="" />
          </div>

          <div className="content-postbtn">
            <p className="content">{post.content}</p>
          </div>
        </div>

        {editing ? (
          <textarea value={title} onChange={this.handleChange} name="title" />
        ) : null}
        {editing ? (
          <textarea value={image} onChange={this.handleChange} name="image" />
        ) : null}
        {editing ? (
          <textarea
            value={content}
            onChange={this.handleChange}
            name="content"
          />
        ) : null}
        <div className="buttons">
          {!this.props.isAdmin && (
            <div>
              {editing ? (
                <button className="button" onClick={this.SaveEditing}>
                  Save Changes
                </button>
              ) : (
                <button className="button" onClick={this.flipEditing}>
                  Edit
                </button>
              )}
              <button
                className="button"
                onClick={() => this.props.deletePost(this.props.id)}
              >
                delete
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default posts;
