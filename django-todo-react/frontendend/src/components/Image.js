import React, { Component } from "react";

export default class Image extends Component {
  render() {
    return (
      <React.Fragment>
        <img
          src={this.props.file}
          alt={this.props.name}
          className="image"
        ></img>
      </React.Fragment>
    );
  }
}