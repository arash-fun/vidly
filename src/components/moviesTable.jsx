import React from "react";
import Like from "./common/like";

const MoviesTable = (props) => {
  const { movies, onLike, onDelete } = props;
  
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Gerne</th>
          <th>Stock</th>
          <th>Rate</th>
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
};

export default MoviesTable;
