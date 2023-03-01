import { Schema, model } from "mongoose";
import { IClient } from "../types";

const ClientSchema = new Schema<IClient>({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
  },
});

const ClientModel = model("Client", ClientSchema);

export default ClientModel;
