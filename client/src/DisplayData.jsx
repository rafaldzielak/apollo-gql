import { gql, useLazyQuery, useQuery } from "@apollo/client";
import React, { useState } from "react";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      age
      id
      name
      nationality
      username
      friends {
        age
        name
      }
      favouriteMovies {
        id
        name
      }
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      isInTheaters
      name
      yearOfPublication
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const DisplayData = () => {
  const [movieSearched, setMovieSearched] = useState("");

  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: moviesData } = useQuery(QUERY_ALL_MOVIES);

  const [fetchMovie, { data: movieSearchedData, error: movieError }] = useLazyQuery(GET_MOVIE_BY_NAME);

  console.log(movieSearchedData);

  console.log(moviesData);
  if (loading) return <h1>Data is loading</h1>;
  if (error) console.log(error);
  if (movieError) console.log(movieError);
  return (
    <div>
      {data?.users &&
        data.users.map((user) => (
          <div>
            <h1>Name: {user.name}</h1>
            <h3>Username: {user.username}</h3>
            <h3>Age: {user.age}</h3>
            <h3>Nationality: {user.nationality}</h3>
          </div>
        ))}
      <h1>Movies</h1>
      {moviesData?.movies && moviesData.movies.map((movie) => <h1>Name: {movie.name}</h1>)}
      <div>
        <input
          type='text'
          placeholder='Interstellar...'
          onChange={(event) => {
            setMovieSearched(event.target.value);
          }}
        />
        <button onClick={() => fetchMovie({ variables: { name: movieSearched } })}>Fetch Data</button>
        <div>{movieSearchedData && <h1>{movieSearchedData.movie.name}</h1>}</div>
        <div>{movieError && <h1>Error fetching data</h1>}</div>
      </div>
    </div>
  );
};

export default DisplayData;
