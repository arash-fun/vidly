import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { pagination } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ genres: getGenres(), movies: getMovies() });
    this.setState({ genres, movies: getMovies() });
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
    // console.log("handleGenreSelect", genre);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (path) => {
    // console.log("handleSort:", path);
    const sortColumn = { ...this.state.sortColumn };
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

    this.setState({ sortColumn });
    console.log("post sortColumn:", this.state.sortColumn);

    // this.setState({ sortColumn: { path, order: "asc" } });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      selectedGenre,
      sortColumn,
    } = this.state;

    if (count === 0) return <p>empty movies</p>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    // console.log("sortColumn.path:", sortColumn.path);
    // console.log("sortColumn.order:", sortColumn.order);

    // console.log("filtered:", filtered);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    // console.log("sorted:", sorted);

    const movies = pagination(sorted, currentPage, pageSize);

    return (
      <div className="row">
        {/* sidebar */}
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        {/* /sidebar */}

        {/* content */}
        <div className="col">
          <p>showing {filtered.length} movies in the DB</p>

          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />

          <Pagination
            itemCount={filtered.length}
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
