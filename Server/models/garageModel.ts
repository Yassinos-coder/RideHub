import mongoose from "mongoose";

const garageSchema = new mongoose.Schema(
  {
    bikeName: {
      type: String,
    },
    bikeModel: {
      type: String,
    },
    bikeNickname: {
      type: String,
    },
    bikeYear: {
      type: String,
    },
    bikePic: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const garageModel = mongoose.model("UserGarage", garageSchema);
