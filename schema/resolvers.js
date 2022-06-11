import { UserList } from "../FakeData.js";

export const resolvers = {
  Query: {
    users() {
      return UserList;
    },
  },
};
