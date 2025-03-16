import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
},{
    timestamps: true // ensure there's a createdAt and updatedAt fields
});

const Product = mongoose.model('Yonex Product', productSchema); // collection name is Yonex Product

export default Product;