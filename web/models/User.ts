import mongoose, { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  fullName: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phoneNumber: string;
  orders: Array<{
    orderId: Schema.Types.ObjectId;
    date: Date;
    totalAmount: number;
  }>;
  salt: string,
  hash: string,
  loginAttempts: number,
  createdAt: Date;
  updatedAt: Date;
}

// Create the User schema
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    salt: { type: String, required: true },
    hash: { type: String, required: true },
    loginAttempts: { type: Number, default: 0 },
    phoneNumber: {
      type: String,
      required: true,
    },
    orders: [
      {
        orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
        date: { type: Date, required: true },
        totalAmount: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create and export the User model
const User = mongoose.models.User || model<IUser>('User', userSchema);

export default User;
