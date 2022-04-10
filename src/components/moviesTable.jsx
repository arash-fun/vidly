import React, { Component } from "react";
import Like from "./common/like";

class MoviesTable extends Component {
  raiseSort = (path) => {
    // console.log("handleSort:", path);
    const sortColumn = { ...this.props.sortColumn };
    // console.log("path:", path);
    // console.log("pre sortColumn:", sortColumn);

    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
      // console.log("if sortColumn:", sortColumn);
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc"; //this make avoid newCol to be 'desc' for first time onClick

      // console.log("else sortColumn:", sortColumn);
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { movies, onLike, onDelete } = this.props;
    // console.log("movies:", movies);

    return (
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => this.raiseSort("title")}>Gerne</th>
            <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
            <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
            <th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like
                  key={movie._id}
                  movie={movie}
                  onLike={() => onLike(movie)}
                  liked={movie.liked}
                  // likedBool={this.state.likedBool}
                />
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(movie)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
