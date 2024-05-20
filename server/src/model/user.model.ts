import bcrypt from "bcryptjs";
import crypto from "crypto";
import mongoose from "mongoose";
import { BCRYPT_SALT_ROUNDS, STATIC_PROFILE_DEFAULT } from "../config";
import { displayNameSchema, passwordSchema } from "../schema/user.schema";
import { Providers } from "../types/types";

export type User = {
    displayName: string;
    id: string;
    email: string;
    password: string;
    role: string;
    photo: string | null;
    verified: boolean;
    verificationCode: string | null;
    passwordResetToken: string | null;
    passwordResetAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    isBanned: boolean;
    banExpiration: Date | null;
    banMessage: string | null;
    provider: Providers;
};

type TUserMethods = {
    comparePassword: (candidate: string) => boolean;
    createVerificationCode: () => string;
    createResetToken: () => string;
};

type TUserModel = mongoose.Model<User, {}, TUserMethods>;

const userSchema = new mongoose.Schema<User, TUserModel, TUserMethods>(
    {
        id: { type: String },
        email: { type: String, required: true },
        displayName: { type: String, required: true },
        password: { type: String, min: 8, max: 32, select: false },
        role: { type: String, default: "admin-test" },
        photo: { type: String, default: STATIC_PROFILE_DEFAULT },
        verified: { type: Boolean, default: false },
        verificationCode: { type: String, select: false, default: null },
        passwordResetToken: { type: String, select: false, default: null },
        passwordResetAt: { type: Date, select: false },
        isBanned: { type: Boolean, default: false },
        banMessage: { type: String },
        banExpiration: { type: Date },
        provider: { type: String, default: "local" },
    },
    {
        versionKey: false,
        timestamps: true,
        methods: {
            comparePassword: function (candidate: string) {
                return bcrypt.compareSync(candidate, this.password);
            },
            createVerificationCode: function () {
                const verificationCode = crypto.randomBytes(32).toString("hex");

                this.verificationCode = crypto
                    .createHash("sha256")
                    .update(verificationCode)
                    .digest("hex");

                return verificationCode;
            },

            createResetToken: function () {
                const resetToken = crypto.randomBytes(32).toString("hex");

                this.passwordResetToken = crypto
                    .createHash("sha256")
                    .update(resetToken)
                    .digest("hex");

                this.passwordResetAt = new Date(Date.now() + 10 * 60 * 1000);

                return resetToken;
            },
        },
    }
);

userSchema.pre("save", function (next: (err?: Error) => void) {
    this.id = this._id;
    if (this.isModified("password")) {
        const salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS);
        const hash = bcrypt.hashSync(passwordSchema.parse(this.password), salt);
        this.password = hash;
    }
    if (this.isModified("displayName")) {
        this.displayName = displayNameSchema.parse(this.displayName);
    }

    next();
});

const userModel = mongoose.model<User, TUserModel>("User", userSchema);
export default userModel;
