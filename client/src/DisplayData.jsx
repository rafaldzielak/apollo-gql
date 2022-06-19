import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
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

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      age
      id
      name
      nationality
      username
    }
  }
`;

const DisplayData = () => {
  const [movieSearched, setMovieSearched] = useState("");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: moviesData } = useQuery(QUERY_ALL_MOVIES);

  const [createUser] = useMutation(CREATE_USER_MUTATION, { refetchQueries: [QUERY_ALL_USERS] });

  const [fetchMovie, { data: movieSearchedData, error: movieError }] = useLazyQuery(GET_MOVIE_BY_NAME);

  if (loading) return <h1>Data is loading</h1>;
  if (error) console.log(error);
  if (movieError) console.log(movieError);
  return (
    <div>
      <div>
        <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} />
        <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
        <input type='number' placeholder='Age' onChange={(e) => setAge(Number(e.target.value))} />
        <input
          type='text'
          placeholder='Nationality'
          onChange={(e) => setNationality(e.target.value.toUpperCase())}
        />
        <button onClick={() => createUser({ variables: { input: { name, username, age, nationality } } })}>
          Create User
        </button>
      </div>

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
          onChange={(event) => setMovieSearched(event.target.value)}
        />
        <button onClick={() => fetchMovie({ variables: { name: movieSearched } })}>Fetch Data</button>
        <div>{movieSearchedData && <h1>{movieSearchedData.movie.name}</h1>}</div>
        <div>{movieError && <h1>Error fetching data</h1>}</div>
      </div>
    </div>
  );
};

export default DisplayData;
