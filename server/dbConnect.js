import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Kết nối MongoDB thành công.");
  } catch (err) {
    console.log("Lỗi kết nỗi MongoDB: ", err);
  }
};

export default dbConnect;
