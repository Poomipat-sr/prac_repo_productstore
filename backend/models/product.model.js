import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, {
    timestamps: true // create  update at
});

const Product = mongoose.model('Product', productSchema); // for create obj on product collection with the schema defined

export default Product;
