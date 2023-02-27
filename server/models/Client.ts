import { Schema, model } from "mongoose";

const ClientSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const ClientModel = model("Client", ClientSchema);

export default ClientModel;
