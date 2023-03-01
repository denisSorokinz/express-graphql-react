import { Schema } from "mongoose";

interface IClient {
  name: string;
  email: string;
  phone: string;
}

type PROJECT_STATUS = "Not Started" | "In Progress" | "Completed";
interface IProject {
  name: string;
  description: string;
  status: PROJECT_STATUS;
  clientId: Schema.Types.ObjectId;
}

export type { IClient, IProject };
