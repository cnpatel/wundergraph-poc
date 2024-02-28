import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { readFileSync } from "fs";
import gql from "graphql-tag";
import { authors } from "./data";
const typeDefs = gql(readFileSync("./schema.graphql", { encoding: "utf-8" }));
const resolvers = {
  Query: {
    authors: () => {
      return authors;
    },
    author: (_, { id }) => {
      return authors.find((author) => author.id === id);
    },
  },
  Author: {
    __resolveReference: ({ id }) => {
      return authors.find((author) => author.id === id);
    }

  },
  Book: {
    __resolveReference(book) {
      return book;
    },
    author(book) {
      return authors.find((author) => author.id === book.authorId);
    },
  }
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

startStandaloneServer(server, {
  listen: {
    port: 4004,
  },
})
  .then(({ url }) => console.log(`Subgraph authors running at ${url}.`))
  .catch((e) => console.log(e));
