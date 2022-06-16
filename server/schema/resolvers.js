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
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    updateUsername: (parent, args) => {
      const user = UserList.find((user) => user.id === Number(args.input.id));
      console.log(user);
      user.username = args.input.username;
      return user;
    },

    deleteUser: (parent, args) => {
      const user = UserList.find((user) => user.id === Number(args.id));
      // DELETE USER LOGIC
      let deletedUser = { ...user };
      return deletedUser;
    },
  },
  User: {
    favouriteMovies: () =>
      MovieList.filter((movie) => movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010),
  },
};