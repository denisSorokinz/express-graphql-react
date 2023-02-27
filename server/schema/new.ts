import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { clients } from "../data";

const Client = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    name: { id: GraphQLID, type: GraphQLString },
    email: { id: GraphQLID, type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    clients: {
      type: new GraphQLList(Client),
      resolve: () => clients,
    },
  }),
});

const Schema = new GraphQLSchema({
  query: RootQuery,
});

export default Schema;
