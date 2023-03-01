import { Schema, model } from "mongoose";
import { IProject } from "../types";

const ProjectSchema = new Schema<IProject>({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
});

const ProjectModel = model("Project", ProjectSchema);

export default ProjectModel;
