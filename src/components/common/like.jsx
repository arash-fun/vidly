import React, { Component } from "react";

const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i
      className={classes}
      // className={this.state.like}
      onClick={props.onLike}
      // onClick={() => this.handleLike(this.props.movie.title)}
      aria-hidden="true"
      style={{ cursor: "pointer " }}
    ></i>
  );
};

export default Like;
