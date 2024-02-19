import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        userAgent: { type: String, required: true },
        refreshToken: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const tokenModel = mongoose.model("Token", tokenSchema);
export default tokenModel;
export type Token = mongoose.InferSchemaType<typeof tokenSchema>;
