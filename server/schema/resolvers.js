import { UserList, MovieList } from "../FakeData.js";
import _ from "lodash";

// query -> users -> favouriteMovies

export const resolvers = {
  Query: {
    // USERS RESOLVERS
    users: () => {
      if (UserList) return { users: UserList };
      return { message: "Something went wrong" };
    },

    user: (parent, args, context, info) => {
      console.log(context);
      console.log(info);
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
    favouriteMovies: (parent) => {
      console.log(parent); // will console.log all users (every field of user)
      return MovieList.filter((movie) => movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010);
    },
  },

  UsersResult: {
    __resolveType(obj) {
      if (obj.users) return "UsersSuccessResult";
      if (obj.message) "UsersErrorResult";
      return null;
    },
  },
};
