import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";

class MoviesTable extends Component {
  columns = [
    { path: "title", lable: "Title" },
    { path: "genre.name", lable: "Genre" },
    { path: "numberInStock", lable: "Stock" },
    { path: "dailyRentalRate", lable: "Rate" },
    { key: "like" },
    { key: "delete" },
  ];

  render() {
    const { movies, onLike, onDelete, onSort, sortColumn } = this.props;
    // console.log("movies:", movies);

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />

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
