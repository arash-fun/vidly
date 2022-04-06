import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { pagination } from "../utils/paginate";

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    currentPage: 1,
    pageSize: 4,
  };

  componentDidMount() {
    this.setState({ genres: getGenres(), movies: getMovies() });
  }

  handleDelete = (movie) => {
    // console.log(movie);
    // deleteMovie(movie);
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    // this.setState({ movies: movies });
    this.setState({ movies });
  };

  handleLike = (movie) => {
    // console.log(movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    // movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    // console.log("handlePageChange:", page);
  };

  handleGenreSelect = (genre) => {
    console.log("handleGenreSelect", genre);
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies, genres } = this.state;

    if (count === 0) return <p>empty movies</p>;

    const movies = pagination(allMovies, currentPage, pageSize);

    return (
      <div className="row">
        {/* sidebar */}
        <div className="col-2">
          <ListGroup items={genres} onItemsSelect={this.handleGenreSelect} />
        </div>
        {/* /sidebar */}

        {/* content */}
        <div className="col">
          <p>showing {count} movies in the DB</p>
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
                      onLike={() => this.handleLike(movie)}
                      liked={movie.liked}
                      // likedBool={this.state.likedBool}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleDelete(movie)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
        {/* /content */}
      </div>
    );
  }
}
export default Movies;
