import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { readFileSync } from "fs";
import gql from "graphql-tag";
import { BookService } from "./bookService";
const typeDefs = gql(readFileSync("./schema.graphql", { encoding: "utf-8" }));

const resolvers = {
  Query: {
    books: () => {
      return new BookService().getBooks();
    },
    book: (_, { id }) => {
      return new BookService().getBookById(id);
    }
  },
  Author: {
    __resolveReference(author) {
      try {
        return author;
      } catch (error) {
        console.error(`An error occurred in resolveReference {$error})`);
      }
    },
    books(parent) {
      try {
        return new BookService().getbooksByAuthorId(parent.id);
      } catch (error) {
        console.error(`An error occurred in Book.Author.books { $error }`)
      }
    }
  },
  Book: {
    __resolveReference: ({ id }) => {
      try {
        console.error(`Invoking Book.Book.___resolveReference {$error}`)
        return new BookService().getBookById(id);
      } catch (error) {
        console.error(`An error occurred in Book.___resolveReference {$error}`)
      }
    }
  }
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

startStandaloneServer(server, {
  listen: {
    port: 4002,
  },
})
  .then(({ url }) => console.log(`Subgraph books running at ${url}`))
  .catch((e) => console.error(e));


