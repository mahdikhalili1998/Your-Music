import mongoose from "mongoose";

export default async function ConnectDB() {
  try {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGOOSE_URI);
    console.log("Connect To DB");
  } catch (error) {
    console.log({ message: " Can Not Connecting To DB", data: error });
  }
}
