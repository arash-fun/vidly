import React, { Component } from "react";

const Like = ({ onLike, liked }) => {
  // const { onLike, liked } = this.props;

  let classes = "clickable fa fa-heart";
  if (!liked) classes += "-o";
  return (
    <i
      className={classes}
      // className={this.state.like}
      onClick={onLike}
      // onClick={() => this.handleLike(this.movie.title)}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
