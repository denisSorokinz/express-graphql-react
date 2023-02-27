import { connect } from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI!;

  const cn = await connect(uri);

  console.log(`MongoDB Connected: ${cn?.connection.host}`.cyan.underline.bold);
};



export { connectDB };
