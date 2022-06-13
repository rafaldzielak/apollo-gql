import { UserList, MovieList } from "../FakeData.js";
import _ from "lodash";

export const resolvers = {
  Query: {
    // USERS RESOLVERS
    users: () => UserList,

    user: (parent, args) => {
      const user = UserList.find((user) => user.id === Number(args.id));
      return user;
    },

    // MOVIES RESOLVERS
    movies: () => MovieList,

    movie: (parent, args) => MovieList.find((movie) => movie.name === args.name),
  },
  User: {
    favouriteMovies: () =>
      MovieList.filter((movie) => movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010),
  },
};
