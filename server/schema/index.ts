import { projects, clients } from "../data";
import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import ClientModel from "../models/Client";
import ProjectModel from "../models/Project";

const Client = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const Project = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: Client,
      resolve: async (source, info) =>
        ClientModel.findById(source.clientId),
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    clients: {
      type: new GraphQLList(Client),
      resolve: () => ClientModel.find(),
    },
    client: {
      type: Client,
      args: { id: { type: GraphQLID } },
      resolve: (source, info) => ClientModel.findById(info.id),
    },
    project: {
      type: Project,
      args: { id: { type: GraphQLID } },
      resolve: (source, info) => ProjectModel.findById(info.id),
    },
    projects: {
      type: new GraphQLList(Project),
      resolve: () => ProjectModel.find(),
    },
  }),
});

const Schema = new GraphQLSchema({ query: RootQuery });

export default Schema;
