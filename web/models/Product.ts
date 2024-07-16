import mongoose, { Schema, model, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  imageUrl: string;
  price: {
    current: number;
    original: number;
    discountPercentage: number;
  };
  customisable: boolean;
  description: string;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    price: {
      current: {
        type: Number,
        required: true,
      },
      original: {
        type: Number,
        required: true,
      },
      discountPercentage: {
        type: Number,
        required: true,
      },
    },
    customisable: {
      type: Boolean,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models.Product || model<IProduct>('Product', productSchema);

export default Product;