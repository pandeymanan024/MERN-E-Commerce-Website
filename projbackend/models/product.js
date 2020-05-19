const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 32,
        require: true
    },
    description: {
        type: String,
        maxlength: 2000,
        require: true,
        trim: true
    },
    price: {
        type: Number,
        trim: true,
        require: true,
        maxlength: 32
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    stock: {
        type: Number,
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);