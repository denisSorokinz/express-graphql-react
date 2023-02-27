import "colors";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";
import { Types } from "mongoose";
import { connectDB } from "./db";
import ProjectModel from "./models/Project";
import ClientModel from "./models/Client";

const port = process.env.PORT || 8000;

const app = express();

connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

// new ClientModel({
//   name: "test",
//   email: "test@gmail.com",
//   phone: "12345"
// }).save();
// new ProjectModel({
//   name: "project-1",
//   description: "descr-1",
//   status: "Completed",
//   clientId: new Types.ObjectId("63fcf9794d56f495916abf21")
// }).save();

app.listen(port, () => console.log(`listening on: ${port}`));
