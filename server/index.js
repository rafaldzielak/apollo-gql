import { ApolloServer } from "apollo-server";
import { resolvers } from "./schema/resolvers.js";
import { typeDefs } from "./schema/typeDefs.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ name: "Rafa", req }),
});

server.listen().then(({ url }) => {
  console.log(`API IS RUNNING AT: ${url}`);
});
