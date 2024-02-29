import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { BCRYPT_SALT_ROUNDS } from "../../config";

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
    provider: string;
    createdAt: Date | string;
    updatedAt: Date | string;
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
        email: { type: String, required: true, unique: true },
        displayName: { type: String, required: true },
        password: { type: String, required: true, min: 8, max: 32, select: false },
        role: { type: String, required: true, default: "user" },
        photo: { type: String, required: true, default: "default-user.jpeg" },
        verified: { type: Boolean, default: false },
        verificationCode: { type: String, select: false },
        passwordResetToken: { type: String, select: false },
        passwordResetAt: { type: Date, select: false },
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
    if (!this.isModified("password")) return next();
    const salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    next();
});

const userModel = mongoose.model<User, TUserModel>("User", userSchema);
export default userModel;
