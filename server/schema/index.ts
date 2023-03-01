import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
} from "graphql";

import { Types } from "mongoose";

import ClientModel from "../models/Client";
import ProjectModel from "../models/Project";
import { IClient } from "../types";

// Types
const Client = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const StatusEnumType = new GraphQLEnumType({
  name: "PROJECT_STATUSES",
  values: {
    not_started: { value: "Not Started" },
    in_progress: { value: "In Progress" },
    completed: { value: "Completed" },
  },
});
const Project = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: {
      type: StatusEnumType,
      defaultValue: "Not Started",
    },
    client: {
      type: Client,
      resolve: (source, info) => ClientModel.findById(source.clientId)!,
    },
  }),
});

// Queries
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

// Mutations
const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    addClient: {
      type: new GraphQLNonNull(Client),
      args: {
        name: { type: GraphQLString! },
        email: { type: GraphQLString! },
        phone: { type: GraphQLString! },
      },
      resolve: (source, info) => {
        const client = new ClientModel({
          ...info,
        });

        return client.save();
      },
    },
    deleteClient: {
      type: Client,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLID },
      },
      resolve: async (source, info) => {
        if (info.id) {
          return ClientModel.findByIdAndDelete(info.id);
        }
        if (info.name) {
          const client = await ClientModel.findOne({ name: info.name });
          return ClientModel.findByIdAndDelete(client?._id);
        }
      },
    },
    addProject: {
      type: Project,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: StatusEnumType,
          defaultValue: "Not Started",
        },
        clientId: { type: GraphQLID },
      },
      resolve: async (source, { clientId, ...info }) => {
        const cId = new Types.ObjectId(clientId);

        const saved = await new ProjectModel({
          ...info,
          clientId: cId,
        }).save();
        console.log("[saved]", saved);
        return saved;
      },
    },
    // updateProject: {
    //   type: Project,
    //   args: {
    //     id: {
    //       type: new GraphQLNonNull(GraphQLID)
    //     },
    //     name: { type: GraphQLString },
    //     description: { type: GraphQLString },
    //     status: {
    //       type: StatusEnumType,
    //       defaultValue: "Not Started"
    //     },
    //     clientId: { type: GraphQLID },
    //   },
    //   resolve: async (source, info) => {
    //     const project = await ProjectModel.findById(info.id);
    //     if(!project) return "Project not found"
    //     project.name = info.name ?? project.name;
    //     project.description = info.description ?? project.description;
    //     project.status = info.status ?? project.status;
    //     project.clientId = info.clientId ?? project.clientId;

    //     return project.save();
    //   }
    // }
    updateProject: {
      type: Project,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: StatusEnumType,
          defaultValue: "Not Started",
        },
        clientId: { type: GraphQLID },
      },
      resolve: (source, info) => {
        return ProjectModel.findByIdAndUpdate(
          info.id,
          {
            $set: {
              ...info,
            },
          },
          {
            new: true,
          }
        );
      },
    },
  },
});

// Schema
const RootSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

export default RootSchema;
